import { FileText, Dna, Mic, Gem, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export type TabName = "generator" | "archetype" | "voice" | "cases" | "calendar";

interface NavigationProps {
  activeTab: TabName | null;
  onTabChange: (tab: TabName) => void;
}

const navItems: { id: TabName; label: string; icon: typeof FileText }[] = [
  { id: "generator", label: "Генератор контента", icon: FileText },
  { id: "archetype", label: "Архетип стратегии", icon: Dna },
  { id: "voice", label: "Голос потока", icon: Mic },
  { id: "cases", label: "Кейсы", icon: Gem },
  { id: "calendar", label: "Лунный календарь", icon: Moon },
];

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 fade-in">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;
        
        return (
          <Button
            key={item.id}
            data-testid={`nav-${item.id}`}
            variant={isActive ? "default" : "secondary"}
            className={`
              px-5 py-3 rounded-2xl font-bold shadow-lg transition-all duration-300
              ${isActive 
                ? "bg-primary text-primary-foreground ring-2 ring-purple-400" 
                : "border border-primary/20 hover:border-primary/50"
              }
            `}
            onClick={() => onTabChange(item.id)}
          >
            <Icon className="h-4 w-4 mr-2" />
            <span className="text-sm sm:text-base">{item.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
