import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Square, Loader2, Sparkles, Copy, Check } from "lucide-react";

interface VoiceRecorderProps {
  onTranscript?: (text: string) => void;
  onGeneratePost?: (transcript: string) => void;
}

export default function VoiceRecorder({ onTranscript, onGeneratePost }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState("");
  const [copied, setCopied] = useState(false);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // todo: remove mock functionality
      const mockTranscript = "Сегодня я хочу поговорить о том, как важно следовать своей интуиции. Многие мои клиенты приходят ко мне с вопросом - как понять, что это именно интуиция, а не страх...";
      setTranscript(mockTranscript);
      onTranscript?.(mockTranscript);
    } else {
      setIsRecording(true);
      setTranscript("");
      setGeneratedPost("");
    }
  };

  const handleGeneratePost = () => {
    setIsGenerating(true);
    onGeneratePost?.(transcript);
    
    // todo: remove mock functionality
    setTimeout(() => {
      setGeneratedPost(`Интуиция vs Страх: как отличить голос души от голоса эго

Знакомо ли вам это чувство - вы стоите на пороге важного решения, и внутри словно две силы тянут в разные стороны?

Одна шепчет: "Иди, это твой путь"
Другая кричит: "Стой! Это опасно!"

Как понять, кому верить?

Делюсь простым, но мощным инструментом, который работает безотказно:

Интуиция приходит спокойно, как легкий ветерок. Она не торопит, не пугает. Просто знание.

Страх всегда громкий. Он создает напряжение в теле, учащает дыхание, сжимает горло.

Попробуйте прямо сейчас: закройте глаза и задайте себе вопрос. Прислушайтесь не к словам - к ощущениям в теле.

Тело никогда не врет.

А вы умеете различать эти голоса?

#интуиция #эзотерика #саморазвитие #духовность`);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="fade-in max-w-2xl mx-auto">
      <Card className="relative overflow-hidden border-2 border-primary/30">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        
        <CardHeader className="text-center relative z-10">
          <CardTitle className="text-3xl font-mystic text-white">
            <Mic className="inline-block h-8 w-8 mr-2 mb-1" />
            Голос Потока
          </CardTitle>
          <p className="text-muted-foreground">
            Надиктуйте свои мысли. ИИ превратит их в идеальный пост.
          </p>
        </CardHeader>

        <CardContent className="relative z-10 space-y-6">
          <div className="text-center">
            <button
              onClick={toggleRecording}
              data-testid="button-record"
              className={`
                w-24 h-24 rounded-full shadow-xl flex items-center justify-center transition-all transform 
                focus:outline-none mx-auto ring-4 ring-card
                ${isRecording 
                  ? "bg-red-500 recording-pulse" 
                  : "bg-gradient-to-br from-red-500 to-pink-600 hover:scale-105"
                }
              `}
            >
              {isRecording ? (
                <Square className="h-10 w-10 text-white" />
              ) : (
                <Mic className="h-10 w-10 text-white" />
              )}
            </button>
            <p className="text-sm text-muted-foreground mt-4">
              {isRecording ? "Запись... Нажмите для остановки" : "Нажмите для записи"}
            </p>
          </div>

          {transcript && (
            <div className="text-left fade-in">
              <label className="text-xs text-muted-foreground mb-1 block">Текст:</label>
              <div className="bg-card/50 p-4 rounded-lg text-muted-foreground text-sm max-h-32 overflow-y-auto border border-muted">
                {transcript}
              </div>
            </div>
          )}

          {transcript && !generatedPost && (
            <Button
              onClick={handleGeneratePost}
              disabled={isGenerating}
              data-testid="button-generate-post"
              className="w-full py-6 bg-primary hover:bg-purple-600 text-white rounded-xl font-bold shadow-lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Создаю пост...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Превратить в Пост
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      {generatedPost && (
        <Card className="mt-8 fade-in border-muted">
          <CardHeader>
            <CardTitle className="text-xl font-mystic text-purple-300">
              Готовый Пост
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none text-sm text-muted-foreground whitespace-pre-wrap bg-card/50 p-4 rounded-lg border border-muted">
              {generatedPost}
            </div>
            <Button
              onClick={handleCopy}
              data-testid="button-copy-post"
              className="mt-4 w-full"
              variant="secondary"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Скопировано!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Скопировать текст
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
