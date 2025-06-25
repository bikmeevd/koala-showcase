## 🚀 Rychlý Start

### Předpoklady

- Node.js (verze 18 nebo vyšší)
- Bun, npm nebo yarn

### Instalace a spuštění

```bash
# Klonování repozitáře
git clone <repository-url>
cd bikmeev-showcase

# Instalace závislostí
bun install
# nebo: npm install

# Spuštění vývojového serveru
bun dev
# nebo: npm run dev

# Aplikace bude dostupná na http://localhost:5173
```

### Ostatní příkazy

```bash
# Build pro produkci
bun run build

# Linting
bun run lint

# Preview produkční verze
bun run preview
```

## 🏗️ Architektura

### Technologický Stack

- **Frontend Framework**: React 19 s TypeScript
- **Styling**: TailwindCSS 4.1 + shadcn/ui komponenty
- **State Management**: Zustand s Immer middleware
- **Build Tool**: Vite 7
- **Linting**: ESLint s TypeScript pravidly

## 🔍 Implementační Detaily

### State Management

Aplikace používá **Zustand** s **Immer** middleware pro efektivní správu stavu:

```typescript
interface HierarchyStore {
  data: HierarchyItem[]; // Hlavní data
  expandedItems: Set<string>; // ID rozbalených položek
  toggleExpanded: (itemId: string) => void; // Přepínání rozbalení
  deleteItem: (path: number[]) => void; // Mazání podle cesty
  isExpanded: (itemId: string) => boolean; // Kontrola stavu
}
```

### Datové Formátování

Aplikace obsahuje robustní systém formátování pro:

- **Datumy**: Custom parser pro nestandardní formáty (`Mon Dec 14 00:00:00 CET 1994`)
- **Gender**: Normalizace různých variant (`m`, `M`, `male`, `female`, atd.)
- **Boolean**: Převod string hodnot (`"true"/"false"` → `"Know"/"Doesn't know"`)
- **Čísla**: Formátování s fixed precision

### URL State Synchronization

Hook `useUrlState` zajišťuje:

- Ukládání rozbalených položek do URL parametrů
- Obnovení stavu při načtení stránky
- Browser history kompatibilitu

## 🛠️ Známé Problémy a Co Bych Udělal Jinak

Během vývoje jsem narazil na několik významných problémů, především s kvalitou a konzistencí dodaných dat. Tyto problémy výrazně ovlivnily architekturu aplikace a způsob, jakým jsem musel k implementaci přistupovat.

### Problémy s Datovou Strukturou

**Nekonzistentní typování pohlaví** bylo jednou z největších překážek. Backend vrací sedm různých variant pro stejný datový typ: `"female"`, `"m"`, `"M"`, `"F"`, `"male"`, `"mouse"` a prázdný string. Tato nekonzistence vynutila vytvoření komplexního formátovače `genderFormatter.ts`, který musí řešit všechny možné varianty a normalizovat je do čitelné podoby. V produkčním prostředí bych doporučil backend týmu zavést standardní enum s jasně definovanými hodnotami.

**Boolean hodnoty jako stringy** představovaly další architektonický problém. Místo standardních boolean typů API vrací `"true"` a `"false"` jako stringové hodnoty. To komplikuje type checking a vyžaduje dodatečnou konverzi. Musel jsem vytvořit speciální type `BooleanString = "true" | "false"` a implementovat custom formátování v `formatters.ts`. V reálném projektu bych toto řešil na backend straně změnou API kontraktu.

**Nestandardní formáty datumů** byly obzvlášť problematické. Data obsahují datumy v nestandardním formátu typu `"Thu May 41 00:00:00 CET 2001"`, kde "May 41" je nereálné datum. Musel jsem implementovat vlastní parser `dateParser.ts` s fallback mechanikou pro různé formáty. Kromě toho data obsahují extrémní budoucí datumy (rok 4042), což naznačuje chyby v datové integraci. Standardní ISO 8601 formát by výrazně zjednodušil implementaci.

**Nekonzistentní formátování číselných hodnot** se projevilo principalmente u Secret Codes, kde některé hodnoty obsahují mezery (`"416 6492176"`) a jiné ne (`"5467717091"`).

**Prázdné children objekty** přidávají další vrstvu složitosti. API někdy vrací `children: {}` místo toho, aby property vůbec neposílalo. To komplikuje type checking a vyžaduje dodatečné kontroly existence dat před jejich zpracováním.

### Architektonické Výzvy

**Rekurzivní mazání** bylo implementačně nejnáročnější částí. Vzhledem k vnořené struktuře dat jsem musel vytvořit rekurzivní algoritmus v `hierarchyStore.ts`, který dokáže procházet path-based systém a mazat položky na libovolné úrovni hierarchie včetně všech potomků. Tato funkcionalita by byla jednodušší s normalizovanou datovou strukturou.

**Type Safety vs. Flexibility** představovalo konstantní dilema. Nepředvídatelná struktura dat vynutila použití type assertions na několika místech, což není ideální z hlediska type safety. Musel jsem najít rovnováhu mezi striktním typováním a praktickou funkčností.

### Co Bych Udělal Jinak s Více Času

**Datová normalizace** by byla mou první prioritou. Implementoval bych middleware vrstvu, která by transformovala API response do konzistentní, type-safe struktury před předáním do store. Tím bych izoloval datové problémy a zjednodušil zbytek aplikace.

**Performance optimalizace** pro velké datové sady by byla dalším krokem. Aktuální implementace načítá všechna data najednou, což není škálovatelné. Implementoval bych lazy loading pro lepší performance s tisíci položek a určitě přidat i paginaci.

## 📝 Poznámky k Vývoji

### Čas Strávený

**Celkem: ~6 hodin**

### Největší Výzvy

1. **Mazání vnořených položek** - implementace rekurzivního mazání podle cesty
2. **Datové formátování** - custom parsery pro nestandardní formáty
3. **Type safety** - práce s nepředvídatelnými datovými strukturami

### Design Rozhodnutí

- **Zustand vs Redux** - jednodušší pro tuto velikost aplikace
- **shadcn/ui** - kvalitní, přístupné komponenty out-of-the-box
- **TailwindCSS** - rychlý development a konzistentní design
- **Immer** - bezpečné mutace složitých vnořených struktur
