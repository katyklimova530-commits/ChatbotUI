import { Beaker } from "lucide-react";

export default function WelcomeSection() {
  return (
    <section className="text-center py-10 fade-in">
      <div className="inline-block p-8 rounded-full bg-primary/10 mb-6 border border-primary/30 mystic-glow">
        <Beaker className="h-16 w-16 text-purple-300 opacity-80" strokeWidth={1} />
      </div>
      <p className="text-muted-foreground text-lg max-w-lg mx-auto">
        Выберите инструмент в меню выше, чтобы начать работу над вашим проявлением.
      </p>
    </section>
  );
}
