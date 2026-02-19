<template>
  <div class="flex-1 flex flex-col">
    <MarkdownStudioToolbar />
    <div class="flex-1 flex gap-4">
      <div class="flex-1 flex justify-center py-12 px-4">
        <MarkdownEditor
          v-model="content"
          class="w-full max-w-3xl border border-default rounded-lg shadow-sm"
        />
      </div>
      <div class="py-6 pr-6">
        <MarkdownStudioSidebar />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const content = ref(`


## Warum Serveranforderungen wichtig sind

Minecraft ist stark von der CPU-Leistung abhängig, insbesondere von der Single-Core-Geschwindigkeit. Der Server berechnet ständig World-Ticks, Spieleraktionen und Chunk-Updates. Der RAM-Verbrauch wächst mit der Weltgröße, der Spielerzahl, Redstone-Konstruktionen, Farmen und Plugins. Die Wahl der richtigen Ressourcen sorgt für stabiles Gameplay ohne Lags.

## Grundanforderungen für einen Minecraft-Server (Java Edition)
Ein aktueller Minecraft-Server (Version 1.21.7) benötigt:

- Java 17 oder höher (ältere Versionen benötigten Java 8–16, moderne Server laufen ab Version 17)
- Mindestens 1 GB RAM für den Server
- Zusätzlicher RAM für das Betriebssystem bei lokalem Hosting
- Eine CPU mit starker Single-Core-Leistung
- Speicherplatz für Weltdateien (150–200 MB für eine neue Welt, mehr bei Wachstum)

Minecraft nutzt bis zu drei Kerne für die Kernmechaniken. Zusätzliche Plugins können weitere Kerne verwenden, aber das World-Ticking bleibt größtenteils single-threaded.

## Empfohlene Hardware nach Servertyp

### LAN-Party-Server (kleiner lokaler Server)
Ideal für temporäre Spielsessions oder kleine private Gruppen.

**Minimum (1–4 Spieler)**  
- CPU: Intel Core 2 Duo / AMD Athlon 64 X2  
- RAM: 1 GB  
- Speicher: 150 MB für die Welt  

**Empfohlen (5–10 Spieler)**  
- CPU: Intel Core 2 Duo / AMD Athlon 64 X2  
- RAM: 2 GB  
- Speicher: 200 MB  

**Optimal (10+ Spieler)**  
- CPU: Intel Core i5-4690 / AMD Ryzen 5 1600  
- RAM: 4 GB  
- Speicher: 200 MB SSD  

Größere Welten, Farmen, Redstone-Maschinen und Mob-Grinder erhöhen die RAM- und CPU-Anforderungen erheblich.

## Was das für heartbeat.systems Hosting bedeutet
heartbeat.systems-Server bieten moderne CPUs und flexible RAM-Zuteilung, wodurch sie sich ideal eignen für:

- Vanilla-SMP-Server  
- Modded-Server  
- Plugin-basierte Server (Paper, Purpur, Spigot usw.)  
- Langfristige Weltprojekte mit hoher Spieleraktivität  

Mit schnellem SSD-Speicher und starken Single-Core-CPUs ist die Plattform bestens für leistungsintensive Minecraft-Workloads geeignet.

## Fazit
Einen Minecraft-Server zu betreiben muss nicht kompliziert sein. Mit der richtigen CPU, ausreichend RAM und solidem Hosting von heartbeat.systems genießen Ihre Spieler ein flüssiges und zuverlässiges Spielerlebnis. Dieser Leitfaden bietet einen einfachen Einstieg, um die passenden Ressourcen zu wählen und Leistungsprobleme zu vermeiden.
`);

// content.value = "";
</script>
