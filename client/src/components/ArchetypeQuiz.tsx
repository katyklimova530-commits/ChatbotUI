import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2, Check, RotateCcw, Sparkles, Palette } from "lucide-react";

interface Question {
  q: string;
  a: string[];
}

interface ArchetypeProfile {
  topArchetypes: string[];
  description: string;
  brandVoice: {
    tone: string;
    keywords: string[];
  };
  visualGuide: {
    colors: string[];
    fonts: string;
    vibes: string;
  };
}

const archetypeQuestions: Question[] = [
  {
    q: "Что для вас важнее всего в работе с клиентом?",
    a: ["Дать им структуру и четкий план (Правитель)", "Позаботиться, выслушать и утешить (Заботливый)", "Вдохновить на большие перемены и магию (Маг)", "Показать правду, даже если она жесткая (Бунтарь)"]
  },
  {
    q: "Как вы относитесь к правилам и традициям в эзотерике?",
    a: ["Чту традиции, но адаптирую их (Мудрец)", "Создаю свои собственные правила (Творец)", "Соблюдаю строго, это база (Правитель)", "Люблю нарушать правила и шокировать (Шут)"]
  },
  {
    q: "Какая фраза лучше всего описывает ваш подход?",
    a: ["Всё будет так, как ты захочешь (Маг)", "Я знаю, как правильно, и научу тебя (Учитель/Мудрец)", "Давай просто будем собой (Славный малый)", "Мы вместе пройдем этот путь (Герой)"]
  },
  {
    q: "Чего вы больше всего боитесь в профессиональном плане?",
    a: ["Быть скучным и обычным (Бунтарь)", "Навредить клиенту или дать неверный совет (Заботливый)", "Потерять контроль над ситуацией (Правитель)", "Оказаться некомпетентным (Мудрец)"]
  },
  {
    q: "Какой стиль одежды или визуальный образ вам ближе?",
    a: ["Строгий, дорогой, статусный (Правитель)", "Мистический, загадочный, мантии (Маг)", "Яркий, необычный, эпатажный (Шут/Бунтарь)", "Уютный, мягкий, натуральный (Заботливый/Славный малый)"]
  },
];

interface ArchetypeQuizProps {
  onComplete?: (profile: ArchetypeProfile) => void;
  onApply?: (profile: ArchetypeProfile) => void;
}

export default function ArchetypeQuiz({ onComplete, onApply }: ArchetypeQuizProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [profile, setProfile] = useState<ArchetypeProfile | null>(null);

  const handleSubmit = () => {
    const allAnswered = archetypeQuestions.every((_, idx) => answers[idx]);
    if (!allAnswered) {
      console.log("Please answer all questions");
      return;
    }

    setIsAnalyzing(true);

    // todo: remove mock functionality
    setTimeout(() => {
      const mockProfile: ArchetypeProfile = {
        topArchetypes: ["Маг", "Мудрец", "Бунтарь"],
        description: "Глубокий, трансформационный стиль с нотками провокации. Вы умеете видеть суть и не боитесь говорить правду.",
        brandVoice: {
          tone: "Загадочный, но доступный. Мудрый, но не занудный. С легкой ноткой провокации.",
          keywords: ["трансформация", "глубина", "правда", "магия", "путь"]
        },
        visualGuide: {
          colors: ["#7c3aed", "#1e1b4b", "#fbbf24"],
          fonts: "Cormorant Garamond для заголовков, Inter для текста",
          vibes: "Мистический минимализм с золотыми акцентами"
        }
      };
      setProfile(mockProfile);
      setIsAnalyzing(false);
      onComplete?.(mockProfile);
    }, 2000);
  };

  const handleReset = () => {
    setAnswers({});
    setProfile(null);
  };

  const handleApply = () => {
    if (profile) {
      onApply?.(profile);
      console.log("Archetype applied:", profile);
    }
  };

  if (profile) {
    return (
      <section className="fade-in">
        <Card className="relative overflow-hidden bg-gradient-to-br from-card via-card to-primary/10 border-primary/30">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: `linear-gradient(135deg, ${profile.visualGuide.colors[0]}40 0%, ${profile.visualGuide.colors[1]}40 100%)`
            }}
          />
          
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 text-muted-foreground"
            onClick={handleReset}
            data-testid="button-reset-quiz"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Пройти заново
          </Button>

          <CardContent className="relative z-10 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div>
                <Badge variant="secondary" className="mb-4 bg-white/10 text-white tracking-widest uppercase">
                  Ваш стиль
                </Badge>
                <h2 className="text-4xl md:text-5xl font-mystic text-white mb-4 font-bold leading-tight">
                  {profile.topArchetypes.join("-")}
                </h2>
                <p className="text-muted-foreground text-lg mb-6">{profile.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {profile.brandVoice.keywords.map((keyword) => (
                    <Badge key={keyword} variant="outline" className="bg-white/5">
                      {keyword}
                    </Badge>
                  ))}
                </div>

                <Card className="bg-black/30 border-white/10">
                  <CardContent className="p-4">
                    <h4 className="text-purple-300 text-xs uppercase font-bold mb-2">
                      Тональность (Tone of Voice)
                    </h4>
                    <p className="text-sm text-muted-foreground italic">
                      {profile.brandVoice.tone}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-card/50 border-white/10">
                <CardHeader>
                  <CardTitle className="text-xl font-mystic text-white flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Визуальный код
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-xs text-muted-foreground block mb-2">Цвета</span>
                    <div className="flex gap-3">
                      {profile.visualGuide.colors.map((color) => (
                        <div
                          key={color}
                          className="w-12 h-12 rounded-lg shadow-lg ring-2 ring-white/20"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Шрифты</span>
                    <span className="text-white text-sm">{profile.visualGuide.fonts}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Атмосфера (Vibe)</span>
                    <span className="text-white text-sm">{profile.visualGuide.vibes}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <Button
                onClick={handleApply}
                data-testid="button-apply-archetype"
                className="bg-white text-primary hover:bg-purple-50 font-bold shadow-lg"
              >
                <Check className="h-5 w-5 mr-2" />
                Активировать этот стиль
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Стиль будет применен ко всем будущим генерациям контента
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="fade-in">
      <Card className="border-primary/30">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-mystic text-purple-200 mb-2">
            ДНК Вашего Личного Бренда
          </CardTitle>
          <p className="text-muted-foreground">
            Пройдите диагностику, чтобы нейросеть "заговорила" вашим голосом.
          </p>
        </CardHeader>
        
        <CardContent className="max-w-2xl mx-auto space-y-6">
          {archetypeQuestions.map((question, idx) => (
            <Card key={idx} className="bg-card/50 border-muted">
              <CardContent className="p-6">
                <h4 className="text-lg text-foreground mb-4 font-medium">
                  {idx + 1}. {question.q}
                </h4>
                <RadioGroup
                  value={answers[idx] || ""}
                  onValueChange={(value) => setAnswers({ ...answers, [idx]: value })}
                >
                  {question.a.map((answer, aIdx) => (
                    <div
                      key={aIdx}
                      className="flex items-center space-x-3 p-3 rounded-lg hover-elevate cursor-pointer"
                    >
                      <RadioGroupItem
                        value={answer}
                        id={`q${idx}-a${aIdx}`}
                        data-testid={`radio-q${idx}-a${aIdx}`}
                      />
                      <Label
                        htmlFor={`q${idx}-a${aIdx}`}
                        className="text-muted-foreground text-sm cursor-pointer flex-1"
                      >
                        {answer}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}

          <div className="text-center pt-4">
            <Button
              onClick={handleSubmit}
              disabled={isAnalyzing}
              data-testid="button-submit-quiz"
              className="px-8 py-6 bg-gradient-to-r from-pink-600 to-primary text-white font-bold rounded-xl shadow-lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Анализирую ДНК бренда...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Раскрыть мой Архетип
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
