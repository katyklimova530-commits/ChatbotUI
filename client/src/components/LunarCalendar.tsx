import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Check, X, Moon } from "lucide-react";

interface MoonData {
  day: number;
  phase: string;
  zodiac: string;
  description: string;
  good: string[];
  bad: string[];
}

export default function LunarCalendar() {
  const [isLoading, setIsLoading] = useState(true);
  const [moonData, setMoonData] = useState<MoonData | null>(null);

  const currentDate = new Date().toLocaleDateString("ru-RU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    // todo: remove mock functionality
    const timer = setTimeout(() => {
      setMoonData({
        day: 12,
        phase: "Растущая Луна",
        zodiac: "Луна в Деве",
        description: "Сегодня благоприятный день для начала новых проектов и планирования. Энергия роста поддерживает все начинания. Луна в знаке Девы усиливает способность к анализу и детализации. Хороший день для работы с числами, документами и систематизации информации.",
        good: [
          "Начало новых проектов",
          "Планирование и стратегия",
          "Публикация экспертного контента",
          "Продажи и переговоры",
          "Привлечение клиентов",
          "Работа с финансами"
        ],
        bad: [
          "Завершение важных дел",
          "Подведение итогов",
          "Отдых и релаксация",
          "Эмоциональные решения"
        ]
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="fade-in">
      <Card className="relative overflow-visible bg-white border-2 border-purple-300 shadow-lg">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-[100px] opacity-50 pointer-events-none" />
        
        <CardHeader className="text-center relative z-10">
          <CardTitle className="text-3xl font-mystic text-purple-700 mb-2">
            Энергии Сегодняшнего Дня
          </CardTitle>
          <p className="text-purple-500 text-lg border-b-2 border-purple-200 pb-2 inline-block capitalize">
            {currentDate}
          </p>
        </CardHeader>

        <CardContent className="relative z-10">
          {isLoading ? (
            <div className="py-16 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-purple-500 mx-auto mb-4" />
              <p className="text-purple-500 animate-pulse">Считываю положение звезд...</p>
            </div>
          ) : moonData && (
            <div className="fade-in space-y-8">
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-200 to-pink-200 shadow-lg flex items-center justify-center relative overflow-hidden mb-4 border-4 border-purple-300">
                  <div className="absolute inset-0 bg-white/30 rounded-full transform -translate-x-4 translate-y-2 blur-md" />
                  <span className="text-5xl font-mystic font-bold text-purple-700 relative z-10 drop-shadow-md">
                    {moonData.day}
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl text-purple-700 font-bold flex items-center justify-center gap-2">
                    <Moon className="h-6 w-6 text-pink-500" />
                    {moonData.phase}
                  </h3>
                  <p className="text-purple-500 font-medium mt-1 text-lg tracking-wide uppercase">
                    {moonData.zodiac}
                  </p>
                </div>
              </div>

              <Card className="bg-purple-50 border-2 border-purple-300 mx-auto max-w-3xl">
                <CardContent className="p-6">
                  <p className="text-purple-700 text-lg leading-relaxed font-mystic italic">
                    {moonData.description}
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card className="bg-green-50 border-2 border-green-300">
                  <CardContent className="p-5">
                    <h4 className="text-green-600 font-bold mb-3 uppercase tracking-wider text-sm flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      Благоприятно
                    </h4>
                    <ul className="text-green-700 text-sm space-y-2">
                      {moonData.good.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-red-50 border-2 border-red-300">
                  <CardContent className="p-5">
                    <h4 className="text-red-600 font-bold mb-3 uppercase tracking-wider text-sm flex items-center gap-2">
                      <X className="h-4 w-4" />
                      Неблагоприятно
                    </h4>
                    <ul className="text-red-700 text-sm space-y-2">
                      {moonData.bad.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center pt-4">
                <Badge variant="secondary" className="text-sm px-4 py-2 bg-purple-100 text-purple-700 border-2 border-purple-400">
                  Рекомендация для контента: Публикуйте экспертные посты и продающий контент
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
