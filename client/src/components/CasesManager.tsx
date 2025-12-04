import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload, Eye, Loader2, Rocket, Save, Copy, Palette, X, Search } from "lucide-react";

interface CaseData {
  id: string;
  screenshot?: string;
  reviewText: string;
  before: string;
  action: string;
  after: string;
  tags: string[];
  generatedHeadlines?: string[];
  generatedQuote?: string;
  generatedBody?: string;
}

const suggestedTags = ["Деньги", "Отношения", "Здоровье", "Предназначение"];

interface CasesManagerProps {
  onSaveCase?: (caseData: CaseData) => void;
}

export default function CasesManager({ onSaveCase }: CasesManagerProps) {
  const [reviewText, setReviewText] = useState("");
  const [before, setBefore] = useState("");
  const [action, setAction] = useState("");
  const [after, setAfter] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCase, setGeneratedCase] = useState<CaseData | null>(null);
  const [showVisualModal, setShowVisualModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTag, setFilterTag] = useState("all");

  // todo: remove mock functionality
  const [savedCases, setSavedCases] = useState<CaseData[]>([
    {
      id: "1",
      reviewText: "После консультации мой бизнес вырос в 3 раза!",
      before: "Застой в бизнесе",
      action: "Анализ судьбы + расклад на деньги",
      after: "Рост дохода x3",
      tags: ["Деньги", "Бизнес"],
      generatedHeadlines: ["Как энергетический расклад помог увеличить доход в 3 раза"],
      generatedQuote: "Я не верила в Таро, пока не увидела результат",
      generatedBody: "История трансформации моей клиентки..."
    },
    {
      id: "2",
      reviewText: "Наконец-то нашла своего человека благодаря работе над родовыми сценариями",
      before: "Одиночество 5 лет",
      action: "Проработка родовых сценариев",
      after: "Счастливые отношения",
      tags: ["Отношения"],
      generatedHeadlines: ["От одиночества к счастливым отношениям"],
      generatedQuote: "Родовые сценарии блокировали мое счастье",
      generatedBody: "Когда Анна пришла ко мне, она была в отчаянии..."
    }
  ]);

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(tagInput);
      setTagInput("");
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // todo: remove mock functionality
    setTimeout(() => {
      const newCase: CaseData = {
        id: Date.now().toString(),
        reviewText,
        before,
        action,
        after,
        tags,
        generatedHeadlines: [
          "Как избавиться от денежных блоков за одну сессию",
          "История трансформации: от долгов к процветанию",
          "Реальный отзыв клиента о работе с энергией денег"
        ],
        generatedQuote: reviewText.slice(0, 100) + "...",
        generatedBody: `БЫЛО: ${before}\n\nКлиентка обратилась ко мне с запросом на проработку финансовой сферы. Ситуация казалась безвыходной...\n\nСДЕЛАЛИ: ${action}\n\nМы провели глубокую работу с энергетическими блоками и родовыми программами...\n\nСТАЛО: ${after}\n\nУже через месяц ситуация начала меняться. Появились новые возможности...`
      };
      setGeneratedCase(newCase);
      setIsGenerating(false);
    }, 1500);
  };

  const handleSaveCase = () => {
    if (generatedCase) {
      setSavedCases([generatedCase, ...savedCases]);
      onSaveCase?.(generatedCase);
      setGeneratedCase(null);
      setReviewText("");
      setBefore("");
      setAction("");
      setAfter("");
      setTags([]);
    }
  };

  const handleCopyCase = () => {
    if (generatedCase) {
      const text = `${generatedCase.generatedHeadlines?.[0]}\n\n"${generatedCase.generatedQuote}"\n\n${generatedCase.generatedBody}`;
      navigator.clipboard.writeText(text);
    }
  };

  const filteredCases = savedCases.filter(c => {
    const matchesSearch = c.reviewText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.before.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.after.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = filterTag === "all" || c.tags.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(savedCases.flatMap(c => c.tags)));

  return (
    <section className="fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle className="text-2xl font-mystic text-purple-200">
                Создать Кейс
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="block text-sm text-purple-300 mb-2">1. Скриншот</Label>
                <div className="relative border-2 border-dashed border-primary/30 rounded-xl p-6 text-center cursor-pointer hover-elevate transition group">
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept="image/*"
                    data-testid="input-screenshot"
                  />
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground group-hover:text-foreground" />
                  <div className="text-muted-foreground text-sm group-hover:text-foreground">
                    Загрузить (JPG, PNG)
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 w-full text-blue-300 hover:text-blue-200 bg-blue-600/10"
                  data-testid="button-recognize"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Распознать текст
                </Button>
              </div>

              <div>
                <Label className="block text-sm text-purple-300 mb-2">2. Текст отзыва</Label>
                <Textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Вставьте текст отзыва клиента..."
                  className="bg-card border-muted"
                  rows={3}
                  data-testid="textarea-review"
                />
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">БЫЛО</Label>
                  <Input
                    value={before}
                    onChange={(e) => setBefore(e.target.value)}
                    placeholder="Исходная ситуация"
                    className="bg-card border-muted"
                    data-testid="input-before"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">СДЕЛАЛИ</Label>
                  <Input
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    placeholder="Что было сделано"
                    className="bg-card border-muted"
                    data-testid="input-action"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">СТАЛО</Label>
                  <Input
                    value={after}
                    onChange={(e) => setAfter(e.target.value)}
                    placeholder="Результат"
                    className="bg-card border-muted"
                    data-testid="input-after"
                  />
                </div>
              </div>

              <div>
                <Label className="block text-sm text-purple-300 mb-2">Теги</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {suggestedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover-elevate"
                      onClick={() => addTag(tag)}
                      data-testid={`tag-suggestion-${tag}`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  placeholder="Введите тег и нажмите Enter"
                  className="bg-card border-muted"
                  data-testid="input-tag"
                />
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="default" className="pr-1">
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-destructive"
                          data-testid={`remove-tag-${tag}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !reviewText}
                className="w-full py-6 bg-gradient-to-r from-primary to-pink-600 font-bold"
                data-testid="button-generate-case"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Генерирую...
                  </>
                ) : (
                  <>
                    <Rocket className="h-5 w-5 mr-2" />
                    Сгенерировать
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7 space-y-6">
          {generatedCase && (
            <Card className="border-2 border-primary relative fade-in">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => setGeneratedCase(null)}
                data-testid="button-close-preview"
              >
                <X className="h-4 w-4" />
              </Button>
              <CardHeader>
                <CardTitle className="text-xl font-mystic text-white">
                  Готовый Кейс
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Заголовки</Label>
                  <div className="space-y-2 mt-1">
                    {generatedCase.generatedHeadlines?.map((headline, idx) => (
                      <div key={idx} className="p-2 bg-card rounded text-sm">
                        {headline}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Цитата</Label>
                  <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-2 bg-card/50 p-3 rounded-r">
                    "{generatedCase.generatedQuote}"
                  </blockquote>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Текст</Label>
                  <div className="bg-card p-4 rounded-lg text-sm text-muted-foreground whitespace-pre-wrap max-h-64 overflow-y-auto border border-muted">
                    {generatedCase.generatedBody}
                  </div>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <Button onClick={handleSaveCase} className="flex-1" data-testid="button-save-case">
                    <Save className="h-4 w-4 mr-2" />
                    В Библиотеку
                  </Button>
                  <Button variant="secondary" onClick={handleCopyCase} data-testid="button-copy-case">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="bg-pink-600/20 hover:bg-pink-600/30 text-pink-300"
                    onClick={() => setShowVisualModal(true)}
                    data-testid="button-create-visual"
                  >
                    <Palette className="h-4 w-4 mr-2" />
                    Макет
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex justify-between items-center gap-4 flex-wrap">
                <CardTitle className="text-2xl font-mystic text-purple-200">
                  Библиотека
                </CardTitle>
                <div className="flex gap-2 flex-wrap">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Поиск..."
                      className="bg-card border-muted pl-9 w-32 focus:w-40 transition-all"
                      data-testid="input-search-cases"
                    />
                  </div>
                  <select
                    value={filterTag}
                    onChange={(e) => setFilterTag(e.target.value)}
                    className="bg-card border border-muted text-foreground text-sm rounded-md px-3 py-2"
                    data-testid="select-filter-tag"
                  >
                    <option value="all">Все теги</option>
                    {allTags.map((tag) => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto">
                {filteredCases.map((caseItem) => (
                  <Card key={caseItem.id} className="bg-gradient-to-br from-primary/20 to-card border-primary/20 hover-elevate cursor-pointer">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-foreground mb-2 line-clamp-2">
                        {caseItem.generatedHeadlines?.[0] || caseItem.before + " → " + caseItem.after}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                        "{caseItem.generatedQuote || caseItem.reviewText}"
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {caseItem.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showVisualModal} onOpenChange={setShowVisualModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Визуальный макет кейса</DialogTitle>
          </DialogHeader>
          {generatedCase && (
            <div className="bg-gradient-to-br from-purple-900 to-slate-900 p-6 rounded-xl aspect-[4/5] flex flex-col justify-between relative overflow-hidden border border-primary/30">
              <div className="relative z-10">
                <h2 className="text-xl font-bold text-white mb-4">
                  {generatedCase.generatedHeadlines?.[0]}
                </h2>
                <p className="text-lg text-purple-100 italic">
                  "{generatedCase.generatedQuote}"
                </p>
              </div>
              <div className="relative z-10 mt-4 grid grid-cols-3 gap-2 text-xs text-center">
                <div className="bg-white/10 p-2 rounded backdrop-blur-sm">
                  БЫЛО<br />
                  <span className="font-bold">{generatedCase.before}</span>
                </div>
                <div className="bg-white/10 p-2 rounded backdrop-blur-sm">
                  СДЕЛАЛИ<br />
                  <span className="font-bold">{generatedCase.action}</span>
                </div>
                <div className="bg-primary/30 p-2 rounded border border-primary/50 backdrop-blur-sm text-purple-200">
                  СТАЛО<br />
                  <span className="font-bold">{generatedCase.after}</span>
                </div>
              </div>
            </div>
          )}
          <p className="text-center text-xs text-muted-foreground">
            Сделайте скриншот для сохранения
          </p>
        </DialogContent>
      </Dialog>
    </section>
  );
}
