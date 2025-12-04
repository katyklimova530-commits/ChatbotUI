import { Beaker } from "lucide-react";

export default function WelcomeSection() {
  return (
    <section className="text-center py-10 fade-in">
      <div className="inline-block p-8 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 mb-6 border-2 border-purple-300 shadow-lg">
        <Beaker className="h-16 w-16 text-purple-500" strokeWidth={1} />
      </div>
      <p className="text-purple-600 text-lg max-w-lg mx-auto">
        Выберите инструмент в меню выше, чтобы начать работу над вашим проявлением.
      </p>
    </section>
  );
}
