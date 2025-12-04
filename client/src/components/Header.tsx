import { Sparkles } from "lucide-react";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export default function Header({ 
  title = "Ваш персональный ЭЗО-маркетолог",
  subtitle = "Стратегия • Контент • Энергия • Продажи"
}: HeaderProps) {
  return (
    <header className="text-center mb-12 pt-8 fade-in">
      <div className="inline-flex items-center gap-2 mb-4">
        <Sparkles className="h-8 w-8 text-primary opacity-60" />
      </div>
      <h1 className="text-4xl sm:text-6xl font-mystic font-semibold text-purple-300 mb-3 tracking-wide">
        {title}
      </h1>
      <p className="text-purple-400 text-lg sm:text-xl font-light tracking-wider uppercase opacity-80">
        {subtitle}
      </p>
    </header>
  );
}
