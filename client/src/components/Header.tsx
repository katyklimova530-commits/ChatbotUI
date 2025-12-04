import { Sparkles } from "lucide-react";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export default function Header({ 
  subtitle = "Стратегия • Контент • Энергия • Продажи"
}: HeaderProps) {
  return (
    <header className="text-center mb-12 pt-8 fade-in">
      <div className="inline-flex items-center gap-2 mb-4">
        <Sparkles className="h-8 w-8 text-purple-500" />
      </div>
      <h1 className="text-4xl sm:text-6xl font-mystic font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-3 tracking-wide">
        <span className="block">Ваш персональный</span>
        <span className="block">ЭЗО-маркетолог</span>
      </h1>
      <p className="text-purple-500 text-lg sm:text-xl font-light tracking-wider uppercase">
        {subtitle}
      </p>
    </header>
  );
}
