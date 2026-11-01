/* main.js — Cosmic Defender (Android/Google Play build).
 *
 *  - No Yandex Games SDK
 *  - Ads via window.NativeAds
 *  - IAP via window.NativeBilling (stub)
 *  - Local notifications via window.NativePush
 *  - Persistence: localStorage only
 *  - Per-ship, per-stat upgrade trees (Σ 11..88 levels per ship)
 *  - Bullets rotate along trajectory
 *  - Hull drifts laterally when moving
 *  - Visible-world bounds: enemies never spawn out of screen
 */
(function () {
  "use strict";

  // =========================================================
  //  i18n
  // =========================================================
  var I18N = {
    en: {
      tagline: "Blast the swarm, buy ships, chase the score.",
      play: "PLAY", shop: "SHOP", upgrades: "UPGRADES", settings: "SETTINGS",
      back: "BACK", gold: "GOLD", best: "BEST", lv: "LV", flights: "FLIGHTS",
      daily: "🎁 DAILY +50◈",
      controls: "Move: drag / arrows · Select ship: ◄ ► · Pause: Esc",
      paused: "PAUSED", resume: "RESUME", quit: "QUIT TO MENU",
      gameover: "GAME OVER", earned: "EARNED", new_record: "NEW!", record: "RECORD",
      revive: "⟲ REVIVE (AD)", x2_gold: "×2 GOLD (AD)",
      play_again: "PLAY AGAIN", menu: "MENU",
      ship_shop: "SHIP SHOP", upgrades_title: "UPGRADES", settings_title: "SETTINGS",
      sound: "SOUND", sound_sub: "Music & effects",
      vibration: "VIBRATION", vibration_sub: "Haptic feedback",
      reduced_motion: "REDUCED MOTION", reduced_motion_sub: "Less shake & flashes",
      language: "LANGUAGE", on: "ON", off: "OFF", max: "MAX",
      damage: "DAMAGE", fire_rate: "FIRE RATE", speed: "SPEED", life: "LIFE",
      selected: "SELECTED", select: "SELECT", need_gold: "NEED GOLD",
      ready_to_buy: "◈ Ready to buy ", ready_to_upgrade: "◈ Ready to upgrade ",
      save_for: "Save for ",
      upgrades_for: "Upgrades for ",
      no_upgrades_for_premium: "Premium ship — no upgrades needed",
      select_ship_hint: "◄ ► to switch ship",
      sector_clear: "SECTOR CLEAR!", level_up: "LEVEL ",
      rampage: "RAMPAGE!", unstoppable: "UNSTOPPABLE!", legendary: "LEGENDARY!",
      powerup: "POWERUP!", boss_incoming: "!! BOSS !!", phase2: "PHASE 2!",
      revived: "REVIVED!", no_signal: "NO SIGNAL",
      blast: "BLAST! +", one_life: "+1 LIFE", shield: "SHIELD",
      drag_to_move: "DRAG TO MOVE", auto_fire: "AUTO-FIRE IS ON", pause_key: "PAUSE = ESC",
      ready: "Ready", loading: "Loading assets…", launching: "Launching…",
      shots: "shot",
      purchase: "PURCHASE", premium_label: "PREMIUM SHIP — BUY IN SHOP",
      purchase_success: "UNLOCKED!", purchase_failed: "PURCHASE FAILED",
      purchase_canceled: "CANCELED", purchase_loading: "PROCESSING…",
      purchase_tap: "Tap to buy"
    },
    ru: {
      tagline: "Уничтожай рой, покупай корабли, бей рекорды.",
      play: "ИГРАТЬ", shop: "МАГАЗИН", upgrades: "УЛУЧШЕНИЯ", settings: "НАСТРОЙКИ",
      back: "НАЗАД", gold: "ЗОЛОТО", best: "РЕКОРД", lv: "УР", flights: "ЗАБЕГОВ",
      daily: "🎁 БОНУС +50◈",
      controls: "Движение: свайп / стрелки · Выбор корабля: ◄ ► · Пауза: Esc",
      paused: "ПАУЗА", resume: "ПРОДОЛЖИТЬ", quit: "В МЕНЮ",
      gameover: "ИГРА ОКОНЧЕНА", earned: "ЗАРАБОТАНО", new_record: "НОВЫЙ!", record: "РЕКОРД",
      revive: "⟲ ВОЗРОДИТЬСЯ (РЕКЛ)", x2_gold: "×2 ЗОЛОТА (РЕКЛ)",
      play_again: "ЕЩЁ РАЗ", menu: "МЕНЮ",
      ship_shop: "МАГАЗИН КОРАБЛЕЙ", upgrades_title: "УЛУЧШЕНИЯ", settings_title: "НАСТРОЙКИ",
      sound: "ЗВУК", sound_sub: "Музыка и эффекты",
      vibration: "ВИБРАЦИЯ", vibration_sub: "Тактильный отклик",
      reduced_motion: "МЕНЬШЕ АНИМАЦИИ", reduced_motion_sub: "Меньше тряски и вспышек",
      language: "ЯЗЫК", on: "ВКЛ", off: "ВЫКЛ", max: "МАКС",
      damage: "УРОН", fire_rate: "СКОРОСТРЕЛЬНОСТЬ", speed: "СКОРОСТЬ", life: "ЖИЗНИ",
      selected: "ВЫБРАН", select: "ВЫБРАТЬ", need_gold: "НУЖНО ЗОЛОТО",
      ready_to_buy: "◈ Можно купить ", ready_to_upgrade: "◈ Можно улучшить ",
      save_for: "Копите на ",
      upgrades_for: "Улучшения для ",
      no_upgrades_for_premium: "Премиум-корабль — улучшения не нужны",
      select_ship_hint: "◄ ► для смены корабля",
      sector_clear: "СЕКТОР ОЧИЩЕН!", level_up: "УРОВЕНЬ ",
      rampage: "РАЗЪЯРЁН!", unstoppable: "НЕУДЕРЖИМ!", legendary: "ЛЕГЕНДА!",
      powerup: "БОНУС!", boss_incoming: "!! БОСС !!", phase2: "ФАЗА 2!",
      revived: "ВОЗРОЖДЁН!", no_signal: "НЕТ СИГНАЛА",
      blast: "ВЗРЫВ! +", one_life: "+1 ЖИЗНЬ", shield: "ЩИТ",
      drag_to_move: "ТЯНИ, ЧТОБЫ ДВИГАТЬСЯ", auto_fire: "ОГОНЬ АВТОМАТИЧЕСКИЙ", pause_key: "ПАУЗА = ESC",
      ready: "Готово", loading: "Загрузка…", launching: "Запуск…",
      shots: "выстр",
      purchase: "КУПИТЬ", premium_label: "ПРЕМИУМ-КОРАБЛЬ — В МАГАЗИНЕ",
      purchase_success: "ОТКРЫТО!", purchase_failed: "ОШИБКА ПОКУПКИ",
      purchase_canceled: "ОТМЕНЕНО", purchase_loading: "ОБРАБОТКА…",
      purchase_tap: "Нажмите, чтобы купить"
    },
    tr: {
      tagline: "Sürüyü patlat, gemi al, rekoru kır.",
      play: "OYNA", shop: "MAĞAZA", upgrades: "YÜKSELT", settings: "AYARLAR",
      back: "GERİ", gold: "ALTIN", best: "REKOR", lv: "SV", flights: "UÇUŞ",
      daily: "🎁 GÜNLÜK +50◈",
      controls: "Hareket: sürükle / oklar · Gemi: ◄ ► · Duraklat: Esc",
      paused: "DURAKLADI", resume: "DEVAM", quit: "MENÜYE DÖN",
      gameover: "OYUN BİTTİ", earned: "KAZANILAN", new_record: "YENİ!", record: "REKOR",
      revive: "⟲ CANLAN (REKLAM)", x2_gold: "×2 ALTIN (REKLAM)",
      play_again: "TEKRAR OYNA", menu: "MENÜ",
      ship_shop: "GEMİ MAĞAZASI", upgrades_title: "YÜKSELTMELER", settings_title: "AYARLAR",
      sound: "SES", sound_sub: "Müzik ve efektler",
      vibration: "TİTREŞİM", vibration_sub: "Dokunsal geri bildirim",
      reduced_motion: "AZ HAREKET", reduced_motion_sub: "Daha az sarsıntı",
      language: "DİL", on: "AÇIK", off: "KAPALI", max: "MAX",
      damage: "HASAR", fire_rate: "ATEŞ HIZI", speed: "HIZ", life: "CAN",
      selected: "SEÇİLİ", select: "SEÇ", need_gold: "ALTIN GEREKLİ",
      ready_to_buy: "◈ Almaya hazır: ", ready_to_upgrade: "◈ Yükseltmeye hazır: ",
      save_for: "Biriktir: ",
      upgrades_for: "Yükseltmeler: ",
      no_upgrades_for_premium: "Premium gemi — yükseltmeye gerek yok",
      select_ship_hint: "◄ ► gemi değiştir",
      sector_clear: "SEKTÖR TEMİZ!", level_up: "SEVİYE ",
      rampage: "ÖFKELİ!", unstoppable: "DURDURULAMAZ!", legendary: "EFSANE!",
      powerup: "GÜÇLENDİRME!", boss_incoming: "!! BOSS !!", phase2: "FAZ 2!",
      revived: "DİRİLDİ!", no_signal: "SİNYAL YOK",
      blast: "PATLAMA! +", one_life: "+1 CAN", shield: "KALKAN",
      drag_to_move: "SÜRÜKLE", auto_fire: "OTOMATİK ATEŞ", pause_key: "DURAKLAT = ESC",
      ready: "Hazır", loading: "Yükleniyor…", launching: "Başlatılıyor…",
      shots: "atış",
      purchase: "SATIN AL", premium_label: "PREMİUM GEMİ — MAĞAZADA",
      purchase_success: "AÇILDI!", purchase_failed: "SATIN ALMA HATASI",
      purchase_canceled: "İPTAL EDİLDİ", purchase_loading: "İŞLENİYOR…",
      purchase_tap: "Almak için dokunun"
    },
    es: {
      tagline: "Destruye el enjambre, compra naves, supera tu récord.",
      play: "JUGAR", shop: "TIENDA", upgrades: "MEJORAS", settings: "AJUSTES",
      back: "ATRÁS", gold: "ORO", best: "RÉCORD", lv: "NV", flights: "VUELOS",
      daily: "🎁 DIARIO +50◈",
      controls: "Mover: arrastra / flechas · Nave: ◄ ► · Pausa: Esc",
      paused: "PAUSA", resume: "CONTINUAR", quit: "AL MENÚ",
      gameover: "FIN DEL JUEGO", earned: "GANADO", new_record: "¡NUEVO!", record: "RÉCORD",
      revive: "⟲ REVIVIR (ANUNCIO)", x2_gold: "×2 ORO (ANUNCIO)",
      play_again: "JUGAR OTRA VEZ", menu: "MENÚ",
      ship_shop: "TIENDA DE NAVES", upgrades_title: "MEJORAS", settings_title: "AJUSTES",
      sound: "SONIDO", sound_sub: "Música y efectos",
      vibration: "VIBRACIÓN", vibration_sub: "Respuesta táctil",
      reduced_motion: "MENOS MOVIMIENTO", reduced_motion_sub: "Menos sacudidas",
      language: "IDIOMA", on: "SÍ", off: "NO", max: "MÁX",
      damage: "DAÑO", fire_rate: "CADENCIA", speed: "VELOCIDAD", life: "VIDA",
      selected: "SELECCIONADA", select: "ELEGIR", need_gold: "FALTA ORO",
      ready_to_buy: "◈ Listo para comprar ", ready_to_upgrade: "◈ Listo para mejorar ",
      save_for: "Ahorra para ",
      upgrades_for: "Mejoras para ",
      no_upgrades_for_premium: "Nave premium — sin mejoras",
      select_ship_hint: "◄ ► para cambiar nave",
      sector_clear: "¡SECTOR LIMPIO!", level_up: "NIVEL ",
      rampage: "¡FURIA!", unstoppable: "¡IMPARABLE!", legendary: "¡LEYENDA!",
      powerup: "¡POTENCIADOR!", boss_incoming: "¡¡JEFE!!", phase2: "¡FASE 2!",
      revived: "¡REVIVIDO!", no_signal: "SIN SEÑAL",
      blast: "¡EXPLOSIÓN! +", one_life: "+1 VIDA", shield: "ESCUDO",
      drag_to_move: "ARRASTRA", auto_fire: "FUEGO AUTOMÁTICO", pause_key: "PAUSA = ESC",
      ready: "Listo", loading: "Cargando…", launching: "Iniciando…",
      shots: "disp",
      purchase: "COMPRAR", premium_label: "NAVE PREMIUM — EN TIENDA",
      purchase_success: "¡DESBLOQUEADO!", purchase_failed: "ERROR DE COMPRA",
      purchase_canceled: "CANCELADO", purchase_loading: "PROCESANDO…",
      purchase_tap: "Toca para comprar"
    },
    de: {
      tagline: "Zerstöre den Schwarm, kaufe Schiffe, schlage den Rekord.",
      play: "SPIELEN", shop: "SHOP", upgrades: "UPGRADES", settings: "EINSTELLUNGEN",
      back: "ZURÜCK", gold: "GOLD", best: "BESTE", lv: "LV", flights: "FLÜGE",
      daily: "🎁 TÄGLICH +50◈",
      controls: "Bewegen: ziehen / Pfeile · Schiff: ◄ ► · Pause: Esc",
      paused: "PAUSE", resume: "FORTSETZEN", quit: "ZUM MENÜ",
      gameover: "GAME OVER", earned: "VERDIENT", new_record: "NEU!", record: "REKORD",
      revive: "⟲ WIEDERBELEBEN (WERBUNG)", x2_gold: "×2 GOLD (WERBUNG)",
      play_again: "NOCHMAL", menu: "MENÜ",
      ship_shop: "SCHIFFSSHOP", upgrades_title: "UPGRADES", settings_title: "EINSTELLUNGEN",
      sound: "TON", sound_sub: "Musik & Effekte",
      vibration: "VIBRATION", vibration_sub: "Haptisches Feedback",
      reduced_motion: "WENIGER BEWEGUNG", reduced_motion_sub: "Weniger Wackeln",
      language: "SPRACHE", on: "AN", off: "AUS", max: "MAX",
      damage: "SCHADEN", fire_rate: "FEUERRATE", speed: "TEMPO", life: "LEBEN",
      selected: "GEWÄHLT", select: "WÄHLEN", need_gold: "ZU WENIG GOLD",
      ready_to_buy: "◈ Kaufen: ", ready_to_upgrade: "◈ Upgraden: ",
      save_for: "Sparen für ",
      upgrades_for: "Upgrades für ",
      no_upgrades_for_premium: "Premium-Schiff — keine Upgrades",
      select_ship_hint: "◄ ► zum Wechseln",
      sector_clear: "SEKTOR KLAR!", level_up: "LEVEL ",
      rampage: "RASEREI!", unstoppable: "UNAUFHALTSAM!", legendary: "LEGENDE!",
      powerup: "POWER-UP!", boss_incoming: "!! BOSS !!", phase2: "PHASE 2!",
      revived: "WIEDERBELEBT!", no_signal: "KEIN SIGNAL",
      blast: "EXPLOSION! +", one_life: "+1 LEBEN", shield: "SCHILD",
      drag_to_move: "ZIEHEN", auto_fire: "AUTO-FEUER", pause_key: "PAUSE = ESC",
      ready: "Bereit", loading: "Lade…", launching: "Starte…",
      shots: "Schuss",
      purchase: "KAUFEN", premium_label: "PREMIUM-SCHIFF — IM SHOP",
      purchase_success: "FREIGESCHALTET!", purchase_failed: "KAUFFEHLER",
      purchase_canceled: "ABGEBROCHEN", purchase_loading: "VERARBEITE…",
      purchase_tap: "Zum Kaufen tippen"
    },
    fr: {
      tagline: "Détruis l'essaim, achète des vaisseaux, bats ton record.",
      play: "JOUER", shop: "BOUTIQUE", upgrades: "AMÉLIORATIONS", settings: "OPTIONS",
      back: "RETOUR", gold: "OR", best: "RECORD", lv: "NIV", flights: "VOLS",
      daily: "🎁 QUOTIDIEN +50◈",
      controls: "Déplacer : glisser / flèches · Vaisseau : ◄ ► · Pause : Esc",
      paused: "PAUSE", resume: "REPRENDRE", quit: "MENU",
      gameover: "PARTIE TERMINÉE", earned: "GAGNÉ", new_record: "NOUVEAU !", record: "RECORD",
      revive: "⟲ REVIVRE (PUB)", x2_gold: "×2 OR (PUB)",
      play_again: "REJOUER", menu: "MENU",
      ship_shop: "BOUTIQUE VAISSEAUX", upgrades_title: "AMÉLIORATIONS", settings_title: "OPTIONS",
      sound: "SON", sound_sub: "Musique et effets",
      vibration: "VIBRATION", vibration_sub: "Retour haptique",
      reduced_motion: "MOINS D'ANIMATION", reduced_motion_sub: "Moins de secousses",
      language: "LANGUE", on: "OUI", off: "NON", max: "MAX",
      damage: "DÉGÂTS", fire_rate: "CADENCE", speed: "VITESSE", life: "VIE",
      selected: "CHOISI", select: "CHOISIR", need_gold: "OR INSUFFISANT",
      ready_to_buy: "◈ À acheter : ", ready_to_upgrade: "◈ À améliorer : ",
      save_for: "Économiser pour ",
      upgrades_for: "Améliorations pour ",
      no_upgrades_for_premium: "Vaisseau premium — sans améliorations",
      select_ship_hint: "◄ ► pour changer",
      sector_clear: "SECTEUR NETTOYÉ !", level_up: "NIVEAU ",
      rampage: "RAGE !", unstoppable: "INARRÊTABLE !", legendary: "LÉGENDE !",
      powerup: "BONUS !", boss_incoming: "!! BOSS !!", phase2: "PHASE 2 !",
      revived: "RESSUSCITÉ !", no_signal: "PAS DE SIGNAL",
      blast: "EXPLOSION ! +", one_life: "+1 VIE", shield: "BOUCLIER",
      drag_to_move: "GLISSE", auto_fire: "TIR AUTO", pause_key: "PAUSE = ESC",
      ready: "Prêt", loading: "Chargement…", launching: "Lancement…",
      shots: "tir",
      purchase: "ACHETER", premium_label: "VAISSEAU PREMIUM — EN BOUTIQUE",
      purchase_success: "DÉBLOQUÉ !", purchase_failed: "ÉCHEC DE L'ACHAT",
      purchase_canceled: "ANNULÉ", purchase_loading: "TRAITEMENT…",
      purchase_tap: "Appuyez pour acheter"
    }
  };

  var LANG_ORDER = ["en", "ru", "tr", "es", "de", "fr"];

  function detectLang(){
    var langs = [];
    if (navigator.languages && navigator.languages.length) langs = navigator.languages;
    else if (navigator.language) langs = [navigator.language];
    for (var i = 0; i < langs.length; i++) {
      var code = String(langs[i]).toLowerCase().split("-")[0];
      if (I18N[code]) return code;
    }
    return "en";
  }

  var LANG = detectLang();
  function t(key){
    return (I18N[LANG] && I18N[LANG][key]) || I18N.en[key] || key;
  }
  function setLang(code){
    if (!I18N[code]) return;
    LANG = code;
    if (persistent) persistent.language = code;
    try { document.documentElement.lang = code; } catch (e) {}
  }

  // =========================================================
  //  Constants
  // =========================================================
  var LOG_W = 720, LOG_H = 1280;
  var canvas = document.getElementById("game");
  var ctx = canvas.getContext("2d");

  var STATE = { LOADING:0, TITLE:1, PLAYING:2, PAUSED:3, GAMEOVER:4, TOOLSHOP:5, UPGRADES:6, SETTINGS:7 };
  var state = STATE.LOADING;

  var STORAGE_KEY = "cosmic_defender_v2";
  var PREMIUM_SHIP_ID = 10;
  var PREMIUM_PRODUCT_ID = "novaPrime";

  var persistent = {
    best: 0, bestLevel: 0, reviveUsed: false, totalPlays: 0, gold: 0,
    sessions: 0, notifAsked: false,
    ships: { 1: true },
    shipUpgrades: {},
    sound: true, lastDaily: 0,
    tutorialSeen: false, language: LANG,
    settings: { vibration: true, reducedMotion: false },
    lastUpdate: 0
  };

  var scale = 1, dt = 0, lastTs = 0, running = false;
  var pointerActive = false;
  var pointer = { x: LOG_W / 2, y: LOG_H * 0.75 };
  var visualTime = 0, bootOnce = false;

  // Visible world bounds — calculated in resize().
  // On narrow phones the canvas is wider than the screen, so edges of
  // logical 0..720 are off-screen. Enemies and player stay inside
  // the visible portion so nothing spawns out of view.
  var VIS_LEFT  = 60;
  var VIS_RIGHT = LOG_W - 60;

  var BASE_CD     = 130;
  var LEVEL_MS    = 35000;
  var COMBO_MS    = 3000;
  var BASE_STAR_SPEED = 50;

  var screenFlash = { color: "#ffffff", alpha: 0, decay: 0 };
  var gameOverLock = false;

  var game = {
    time:0, score:0, gold:0, level:1, levelTimer:0,
    streak:0, streakTimer:0, mult:1, lives:3,
    shield:0, spreadShot:0,
    spawnMeteor:0, spawnShip:0,
    fireTimer:0, shake:0, selectedShip:1,
    rapidTimer:0, slowTimer:0, bombCd:0,
    event:null, nextBoss:0, ship:null, x2Taken:false
  };

  var entities = {
    player:null, bullets:[], enemies:[], effects:[], particles:[], powerups:[], text:[]
  };

  var SHIP_DEFS = [
    { id:1, name:"FALCON",     cost:0,    dmg:1, shots:2, cd:1.00, spd:1.00, lp:3, spec:"balanced" },
    { id:2, name:"VIPER",      cost:300,  dmg:1, shots:2, cd:0.75, spd:1.12, lp:3, spec:"rapid" },
    { id:3, name:"TITAN",      cost:600,  dmg:1, shots:2, cd:1.10, spd:0.85, lp:5, spec:"tank" },
    { id:4, name:"RAVEN",      cost:900,  dmg:2, shots:1, cd:0.85, spd:1.00, lp:3, spec:"sniper" },
    { id:5, name:"HYDRA",      cost:1400, dmg:1, shots:3, cd:0.90, spd:1.00, lp:3, spec:"spread" },
    { id:6, name:"COMET",      cost:1900, dmg:1, shots:3, cd:0.72, spd:1.20, lp:3, spec:"triple" },
    { id:7, name:"DEVASTATOR", cost:2600, dmg:2, shots:2, cd:0.78, spd:0.95, lp:4, spec:"heavy" },
    { id:8, name:"PHANTOM",    cost:3400, dmg:1, shots:4, cd:0.75, spd:1.35, lp:3, spec:"fast" },
    { id:9, name:"COLOSSUS",   cost:4800, dmg:2, shots:3, cd:0.85, spd:0.90, lp:4, spec:"heavy" },
    { id:10, name:"NOVA PRIME", cost:0, dmg:2, shots:5, cd:0.72, spd:1.40, lp:5, spec:"premium", premium:true, spriteId:9 }
  ];

  var SHIP_UPGRADE_MAX = {
    1:  { dmg: 5,  cd: 3,  spd: 2,  lp: 1 },
    2:  { dmg: 8,  cd: 12, spd: 3,  lp: 1 },
    3:  { dmg: 5,  cd: 3,  spd: 2,  lp: 4 },
    4:  { dmg: 20, cd: 6,  spd: 2,  lp: 2 },
    5:  { dmg: 15, cd: 15, spd: 5,  lp: 3 },
    6:  { dmg: 18, cd: 18, spd: 6,  lp: 4 },
    7:  { dmg: 25, cd: 15, spd: 5,  lp: 5 },
    8:  { dmg: 15, cd: 25, spd: 10, lp: 4 },
    9:  { dmg: 28, cd: 22, spd: 10, lp: 6 },
    10: { dmg: 35, cd: 30, spd: 15, lp: 8 }
  };
  var DEFAULT_UPGRADE_CAP = { dmg: 5, cd: 3, spd: 2, lp: 1 };

  function shipUpgradeMax(shipId, k){
    var row = SHIP_UPGRADE_MAX[shipId] || DEFAULT_UPGRADE_CAP;
    if (k) return row[k] || 0;
    return (row.dmg || 0) + (row.cd || 0) + (row.spd || 0) + (row.lp || 0);
  }

  var KINDS = {
    basic:  { cd:1400, amp:55,  spdMul:1.00, hpMul:1.00, pat:"single", color:"rgba(255,77,94,0.8)" },
    gunner: { cd:1050, amp:70,  spdMul:1.10, hpMul:1.15, pat:"lead",   color:"rgba(255,160,50,0.8)" },
    darter: { cd:850,  amp:110, spdMul:1.45, hpMul:1.00, pat:"double", color:"rgba(160,90,255,0.8)" },
    bomber: { cd:1700, amp:40,  spdMul:0.80, hpMul:1.50, pat:"spread", color:"rgba(90,220,120,0.8)" }
  };

  var KILL_GOLD = { meteor:2, basic:4, gunner:6, darter:8, bomber:10, boss:150 };

  var UPGRADE_CONFIG = {
    dmg: { base:120, growth:1.08, effect:function(l){return "×"+(1+0.025*l).toFixed(3);} },
    cd:  { base:100, growth:1.10, effect:function(l){return "×"+(Math.max(0.55,1-0.012*l)).toFixed(3);} },
    spd: { base:80,  growth:1.10, effect:function(l){return "×"+(1+0.008*l).toFixed(3);} },
    lp:  { base:400, growth:1.15, effect:function(l){return "+"+l;} }
  };
  var UPGRADE_KEYS = ["dmg", "cd", "spd", "lp"];
  var UPGRADE_LABEL_KEY = { dmg:"damage", cd:"fire_rate", spd:"speed", lp:"life" };

  function upgradeCost(k, lvl){
    var cfg = UPGRADE_CONFIG[k];
    return Math.round(cfg.base * Math.pow(cfg.growth, lvl));
  }

  var assets = { images:{}, ready:false };

  window.Game = { state:function(){return state;}, onProgress:null, resumeAudio:function(){ window.AudioManager.unlock(); } };

  // =========================================================
  //  Native ads bridge (safe no-op in browser)
  // =========================================================
  function adsShowBanner(){
    if (window.NativeAds) { try { NativeAds.showBanner(); } catch(e){} }
  }
  function adsHideBanner(){
    if (window.NativeAds) { try { NativeAds.hideBanner(); } catch(e){} }
  }
  function adsInterstitial(){
    if (window.NativeAds) {
      try {
        NativeAds.showInterstitial();
        return;
      } catch(e){}
    }
  }
  function adsRewarded(onReward){
    if (window.NativeAds) {
      try {
        NativeAds.showRewarded(onReward);
        return;
      } catch(e){}
    }
    if (onReward) onReward(false);
  }

  // =========================================================
  //  Native billing bridge (stub)
  // =========================================================
  function billingPurchase(productId){
    if (window.NativeBilling && typeof NativeBilling.purchase === "function") {
      return NativeBilling.purchase(productId);
    }
    return Promise.resolve({ success: false, canceled: false });
  }
  function billingRestore(){
    if (window.NativeBilling && typeof NativeBilling.getPurchases === "function") {
      return NativeBilling.getPurchases();
    }
    return Promise.resolve([]);
  }

  // =========================================================
  //  Native push bridge (safe no-op in browser)
  // =========================================================
  function pushReschedule(dailyClaimed){
    if (window.NativePush && NativePush.ready) {
      try { NativePush.reschedule(LANG, dailyClaimed); } catch(e){}
    }
  }

  // =========================================================
  //  Helpers
  // =========================================================
  function reducedMotion(){ return persistent.settings && persistent.settings.reducedMotion; }
  function vibrationOn(){ return !(persistent.settings && persistent.settings.vibration === false); }
  function haptic(ms){ if (!vibrationOn()) return; try { if (navigator.vibrate) navigator.vibrate(ms); } catch(e){} }
  function flashScreen(color, alpha, durationMs){
    if (reducedMotion()) { alpha *= 0.5; durationMs *= 1.5; }
    screenFlash.color = color; screenFlash.alpha = alpha;
    screenFlash.decay = alpha / durationMs;
  }
  function isOwned(id){ return !!persistent.ships[id] || id === 1; }
  function spendableGold(){ return (persistent.gold||0) + (game.gold||0); }
  function shipById(id){
    for (var i=0;i<SHIP_DEFS.length;i++) if (SHIP_DEFS[i].id===id) return SHIP_DEFS[i];
    return SHIP_DEFS[0];
  }
  function maxShipId(){ return PREMIUM_SHIP_ID; }
  function shipSpriteId(id){
    var s = shipById(id);
    return s && s.spriteId ? s.spriteId : id;
  }

  function emptyUpgrades(){ return { dmg:0, cd:0, spd:0, lp:0 }; }

  function getShipUpgrades(shipId){
    if (!persistent.shipUpgrades) persistent.shipUpgrades = {};
    var key = String(shipId);
    if (!persistent.shipUpgrades[key]) {
      persistent.shipUpgrades[key] = emptyUpgrades();
    }
    return persistent.shipUpgrades[key];
  }

  function upgradeLevel(shipId, k){
    return getShipUpgrades(shipId)[k] || 0;
  }

  function upgradeMultipliers(shipId){
    var u = getShipUpgrades(shipId);
    return {
      dmg: 1 + 0.025 * (u.dmg || 0),
      cd:  Math.max(0.55, 1 - 0.012 * (u.cd || 0)),
      spd: 1 + 0.008 * (u.spd || 0),
      lp:  (u.lp || 0)
    };
  }

  function applyUpgrades(base, shipId){
    var id = (shipId != null) ? shipId : base.id;
    var m = upgradeMultipliers(id);
    return {
      id:base.id, name:base.name, spec:base.spec, shots: base.shots,
      premium: !!base.premium, spriteId: base.spriteId,
      dmg: base.dmg * m.dmg,
      cd:  Math.max(0.40, base.cd * m.cd),
      spd: Math.min(2.4, base.spd * m.spd),
      lp:  Math.min(10, Math.max(1, base.lp + m.lp))
    };
  }

  function bar(norm){
    var n = Math.max(0, Math.min(1, norm));
    var full = 6, filled = Math.round(n*full);
    return new Array(filled+1).join("▮") + new Array(full-filled+1).join("▯");
  }
  function shipStatsText(s){
    return "DMG ×"+s.dmg.toFixed(2)+" · "+s.shots+" "+t("shots")+" · "+
           "FIRE "+bar((1.2 - s.cd) / 0.9)+" · SPD "+bar((s.spd - 0.6))+
           " · ♥ "+bar(s.lp / 10);
  }

  // =========================================================
  //  Assets
  // =========================================================
  function img(name){ return assets.images[name]; }
  function pad3(n){ return n<10?"00"+n : n<100?"0"+n : ""+n; }
  function shipSpritePath(id){
    return "assets/ships/spaceShips_" + pad3(shipSpriteId(id)) + ".png";
  }

  var ASSET_TOTAL = 0, ASSET_LOADED = 0, AUDIO_PROGRESS = 0;
  function reportProgress(){
    var barEl = document.getElementById("load-bar");
    var txtEl = document.getElementById("load-text");
    var v = (ASSET_TOTAL ? (ASSET_LOADED/ASSET_TOTAL) : 0) * 0.7 + AUDIO_PROGRESS * 0.3;
    if (barEl) barEl.style.width = Math.round(v*100)+"%";
    if (txtEl && v > 0.02) txtEl.textContent = t("loading");
  }
  function loadImg(name, file){
    ASSET_TOTAL++;
    return new Promise(function(resolve){
      var im = new Image();
      im.onload  = function(){ assets.images[name]=im; ASSET_LOADED++; reportProgress(); resolve(); };
      im.onerror = function(){ console.warn("Failed", file); ASSET_LOADED++; reportProgress(); resolve(); };
      im.src = "assets/" + file;
    });
  }
  function preloadAssets(){
    var jobs = [];
    jobs.push(loadImg("hero","ships/spaceShips_001.png"));
    jobs.push(loadImg("enemy","ships/spaceShips_006.png"));
    for (var k=1;k<=9;k++) jobs.push(loadImg("ship"+k, "ships/spaceShips_"+pad3(k)+".png"));
    jobs.push(loadImg("meteor1","meteors/spaceMeteors_001.png"));
    jobs.push(loadImg("meteor2","meteors/spaceMeteors_002.png"));
    jobs.push(loadImg("meteor3","meteors/spaceMeteors_003.png"));
    jobs.push(loadImg("meteor4","meteors/spaceMeteors_004.png"));
    jobs.push(loadImg("p_bullet_blue1","missiles/spaceMissiles_001.png"));
    jobs.push(loadImg("p_bullet_blue2","missiles/spaceMissiles_004.png"));
    jobs.push(loadImg("p_bullet_green1","missiles/spaceMissiles_002.png"));
    jobs.push(loadImg("e_bullet_red1","missiles/spaceMissiles_003.png"));
    jobs.push(loadImg("e_bullet_red2","missiles/spaceMissiles_006.png"));
    jobs.push(loadImg("e_bullet_orange1","missiles/spaceMissiles_009.png"));
    for (var i=8;i<=16;i++) jobs.push(loadImg("explode_"+i, "effects/spaceEffects_"+pad3(i)+".png"));
    for (var j=1;j<=4;j++)  jobs.push(loadImg("engine_"+j,  "effects/spaceEffects_"+pad3(j)+".png"));
    return Promise.all(jobs).then(function(){ assets.ready = true; });
  }

  // =========================================================
  //  Canvas
  // =========================================================
  function drawBottomCenter(im,x,y,w,h){ if(!im)return; ctx.drawImage(im, x-w/2, y-h, w, h); }
  function drawCenter(im,x,y,w,h){ if(!im)return; ctx.drawImage(im, x-w/2, y-h/2, w, h); }

  function resize(){
    var vv = window.visualViewport;
    var w = (vv && vv.width)  || window.innerWidth;
    var h = (vv && vv.height) || window.innerHeight;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    var s;
    if (w > h) {
      // Landscape: fit — whole world visible.
      s = Math.min(w / LOG_W, h / LOG_H);
    } else {
      // Portrait: fill height — canvas may be wider than screen.
      s = h / LOG_H;
    }
    scale = s;

    var cw = Math.floor(LOG_W * s);
    var ch = Math.floor(LOG_H * s);

    // Visible region in logical coordinates.
    // If canvas is wider than screen, part of 0..LOG_W is off-screen.
    var visibleW = w / s;
    if (visibleW >= LOG_W) {
      VIS_LEFT  = 60;
      VIS_RIGHT = LOG_W - 60;
    } else {
      var overflow = (LOG_W - visibleW) / 2;
      VIS_LEFT  = Math.ceil(overflow + 60);
      VIS_RIGHT = Math.floor(LOG_W - overflow - 60);
      if (VIS_RIGHT - VIS_LEFT < 200) {
        VIS_LEFT  = 60;
        VIS_RIGHT = LOG_W - 60;
      }
    }

    canvas.width  = Math.floor(cw * dpr);
    canvas.height = Math.floor(ch * dpr);
    canvas.style.width  = cw + "px";
    canvas.style.height = ch + "px";

    ctx.setTransform(s * dpr, 0, 0, s * dpr, 0, 0);
  }

  function pointerToLogical(e){
    var rect = canvas.getBoundingClientRect();
    return { x:(e.clientX-rect.left)/rect.width*LOG_W, y:(e.clientY-rect.top)/rect.height*LOG_H };
  }
  function clamp(v,a,b){ return v<a?a : v>b?b : v; }

  // =========================================================
  //  Input
  // =========================================================
  var keys = { left:false, right:false, up:false, down:false };

  function onDown(e){
    if (e.target && e.target !== canvas) return;
    if (e.pointerType === "touch") e.preventDefault();
    pointerActive = true;
    var p = pointerToLogical(e);
    pointer.x = clamp(p.x, VIS_LEFT, VIS_RIGHT);
    pointer.y = clamp(p.y, LOG_H*0.34, LOG_H*0.94);
    window.AudioManager.unlock();
    if (state === STATE.TITLE) {
      if (p.x < LOG_W*0.20) selectPrevShip();
      else if (p.x > LOG_W*0.80) selectNextShip();
    }
  }
  function onMove(e){
    if (e.pointerType === "mouse" && state === STATE.PLAYING) {
      var p = pointerToLogical(e);
      pointer.x = clamp(p.x, VIS_LEFT, VIS_RIGHT);
      pointer.y = clamp(p.y, LOG_H*0.34, LOG_H*0.94);
      return;
    }
    if (!pointerActive) return;
    var q = pointerToLogical(e);
    pointer.x = clamp(q.x, VIS_LEFT, VIS_RIGHT);
    pointer.y = clamp(q.y, LOG_H*0.34, LOG_H*0.94);
  }
  function onUp(e){ if (e.pointerType === "mouse") return; pointerActive = false; }

  function bindInput(){
    canvas.addEventListener("pointerdown", onDown, { passive:false });
    window.addEventListener("pointermove", onMove, { passive:true });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    window.addEventListener("keydown", function(e){
      switch (e.key) {
        case "ArrowLeft": case "a": case "A":
          if (state===STATE.TITLE) selectPrevShip(); else keys.left = true; break;
        case "ArrowRight": case "d": case "D":
          if (state===STATE.TITLE) selectNextShip(); else keys.right = true; break;
        case "ArrowUp": case "w": case "W": keys.up = true; break;
        case "ArrowDown": case "s": case "S": keys.down = true; break;
        case " ":
          if (state===STATE.TITLE) startRun();
          else if (state===STATE.PLAYING || state===STATE.PAUSED) togglePause();
          break;
        case "Escape":
          if (state===STATE.PLAYING || state===STATE.PAUSED) togglePause();
          else if (state===STATE.TOOLSHOP) closeShop();
          else if (state===STATE.UPGRADES) closeUpgrades();
          else if (state===STATE.SETTINGS) closeSettings();
          break;
        case "m": case "M": toggleSound(); break;
        case "r": case "R": if (state===STATE.GAMEOVER) startRun(); break;
      }
      window.AudioManager.unlock();
    });
    window.addEventListener("keyup", function(e){
      switch (e.key) {
        case "ArrowLeft": case "a": case "A": keys.left=false; break;
        case "ArrowRight": case "d": case "D": keys.right=false; break;
        case "ArrowUp": case "w": case "W": keys.up=false; break;
        case "ArrowDown": case "s": case "S": keys.down=false; break;
      }
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        if (state === STATE.PLAYING) pauseGame();
        if (window.SFX) SFX.suspend();
      } else {
        if (window.SFX && persistent.sound !== false) SFX.resume();
      }
    });

    document.addEventListener("contextmenu", function (e) {
      if (e.target && e.target.closest && e.target.closest("#canvas-holder")) {
        e.preventDefault();
      }
    });

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", resize);
      window.visualViewport.addEventListener("scroll", resize);
    }
  }

  function selectPrevShip(){
    game.selectedShip = Math.max(1, game.selectedShip - 1);
    if (state === STATE.TITLE) refreshCarousel();
    else if (state === STATE.UPGRADES) renderUpgrades();
  }
  function selectNextShip(){
    game.selectedShip = Math.min(maxShipId(), game.selectedShip + 1);
    if (state === STATE.TITLE) refreshCarousel();
    else if (state === STATE.UPGRADES) renderUpgrades();
  }

  // =========================================================
  //  Player / spawning
  // =========================================================
  function makePlayer(){
    return { x:LOG_W/2, y:LOG_H*0.82, w:106, h:80, vx:0, facing:1, invuln:0, enginePhase:0, tilt:0, driftX:0 };
  }
  function enemyCount(){ return entities.enemies.length; }
  function enemyBullets(){
    var n = 0;
    for (var i=0;i<entities.bullets.length;i++) if (entities.bullets[i].color === "enemy") n++;
    return n;
  }
  function hasBoss(){
    for (var i=0;i<entities.enemies.length;i++) if (entities.enemies[i].type === "boss") return true;
    return false;
  }
  function enemyCap(){ return Math.min(30, Math.floor(6 + game.level*1.2)); }
  function enemyBulletCap(){ return Math.min(40, 12 + game.level); }

  function spawnMeteor(){
    var types = ["meteor1","meteor2","meteor3","meteor4"];
    var tSpr = types[(Math.random()*types.length)|0];
    var r = 42 + Math.random()*16;
    var hp = 1 + Math.floor(game.level / 2);
    var spanL = VIS_LEFT + r;
    var spanR = VIS_RIGHT - r;
    if (spanR <= spanL) { spanL = VIS_LEFT; spanR = VIS_RIGHT; }
    entities.enemies.push({
      type:"meteor", sprite:img(tSpr),
      x: spanL + Math.random()*(spanR - spanL), y: -r,
      vx: (Math.random()-0.5)*120,
      vy: 150 + Math.random()*100 + game.time*2.2 + game.level*7,
      r: r, hp: hp, hpMax: hp, angle: Math.random()*Math.PI*2,
      spin: (Math.random()-0.5)*2.2, score:100, kind:"meteor", gold: KILL_GOLD.meteor
    });
  }

  function spawnEnemyShip(){
    var pool = ["basic"];
    if (game.level >= 2) pool.push("gunner");
    if (game.level >= 3) pool.push("darter");
    if (game.level >= 5) pool.push("bomber");
    var kind = pool[(Math.random()*pool.length)|0];
    var K = KINDS[kind];
    var side = Math.random()<0.5 ? -1 : 1;
    var startX = side === -1 ? VIS_LEFT : VIS_RIGHT;

    var eliteChance = game.level >= 5 ? Math.min(0.40, 0.18 + (game.level - 5) * 0.03) : 0;
    var isElite = Math.random() < eliteChance;

    var baseHp = 5 + game.level * 6;
    var hp = Math.round(baseHp * K.hpMul * (isElite ? 1.8 : 1));
    var gold = Math.round((KILL_GOLD[kind] || 4) * (isElite ? 1.6 : 1));

    entities.enemies.push({
      type:"ship", sprite:img("enemy"),
      x:startX, y:-40, baseX:startX, kind:kind,
      vy: 90 + Math.random()*45 + game.level*6,
      r:52, hp:hp, hpMax:hp,
      angle:Math.PI, score: isElite ? 400 : 250,
      gold: gold, elite: isElite,
      shootTimer: 300 + Math.random()*400,
      amplitude: K.amp + Math.random()*30,
      phase: Math.random()*Math.PI*2,
      flash: 0
    });
  }

  function spawnBoss(){
    var bossHp = Math.min(1100, 80 + game.level*30);
    var isSpiral = game.level >= 8;
    var sprite = isSpiral ? img("ship9") : img("ship7");
    var midX = (VIS_LEFT + VIS_RIGHT) * 0.5;
    entities.enemies.push({
      type:"boss", sprite:sprite,
      x: midX, y:-160, baseX: midX,
      vx:110, vy:55, r:110,
      hp:bossHp, hpMax:bossHp, angle:Math.PI, score:2000,
      gold: KILL_GOLD.boss,
      shootTimer:600, amplitude:150, phase:0,
      flash:0, boss:true, bossPhase:1, bossType: isSpiral ? "spiral" : "fan",
      spiralAngle: 0, escortTimer: 5000
    });
    SFX.bossAlarm(); haptic(90);
    addFloat(LOG_W*0.5, 110, t("boss_incoming"), "#ff5a4d", 34, 1400);
    flashScreen("#ff5a4d", 0.28, 400);
  }

  function spawnPlayerBullet(x, y, vx, vy, dmg, color){
    entities.bullets.push({ x:x, y:y, vx:vx, vy:vy, r:12, color:color||"blue", dmg:dmg||1 });
  }
  function firePlayerBullets(){
    var p = entities.player, ship = game.ship;
    if (!p || !ship) return;
    var cx = p.x, cy = p.y - p.h*0.5;
    var spread = game.spreadShot > 0;
    var spec = ship.spec;
    var n = ship.shots < 1 ? 1 : ship.shots;
    var dmg = ship.dmg;
    var color = (dmg >= 2.5) ? (spec === "sniper" ? "#7dff8b" : "#ffcf4a") : "blue";

    if (spec === "premium") {
      var angles = [-0.26, -0.13, 0, 0.13, 0.26];
      var weights = [0.5, 1, 1, 1, 0.5];
      for (var pi = 0; pi < angles.length; pi++) {
        var a2 = angles[pi];
        var dm = dmg * weights[pi];
        var col = (weights[pi] >= 1) ? "#fff3b0" : "#ffcf4a";
        spawnPlayerBullet(cx, cy, Math.sin(a2)*950, -Math.cos(a2)*1050, dm, col);
      }
    } else if (spec === "sniper") {
      spawnPlayerBullet(cx, cy, 0, -1200, dmg, "#7dff8b");
    } else if (spec === "spread" || spread) {
      var base = [-0.20, 0, 0.20];
      var cnt = Math.min(n, base.length);
      for (var i=0;i<cnt;i++){
        var a = base[i];
        spawnPlayerBullet(cx, cy, Math.sin(a)*900, -Math.cos(a)*1000, dmg, color);
      }
    } else if (spec === "heavy") {
      var positions = [-1, -0.35, 0.35, 1];
      var cnt2 = Math.min(n, positions.length);
      for (var j=0;j<cnt2;j++){
        var off = positions[j]*22;
        spawnPlayerBullet(cx+off, cy, off*3, -1000, dmg, color);
      }
    } else {
      for (var k=0;k<n;k++){
        var o = (k - (n-1)/2) * 16;
        spawnPlayerBullet(cx+o, cy, 0, -1000, dmg, color);
      }
    }
    SFX.shoot();
  }
  function fireAt(e, tx, ty, spd){
    var dx = tx - e.x, dy = ty - e.y;
    var d = Math.hypot(dx, dy) || 1;
    if (dy <= 0) return;
    entities.bullets.push({ x:e.x, y:e.y+30, vx:dx/d*spd, vy:dy/d*spd, r:11, color:"enemy" });
  }
  function enemyFire(e){
    var p = entities.player;
    if (!p) return;
    if (enemyBullets() >= enemyBulletCap()) return;
    var K = KINDS[e.kind] || KINDS.basic;
    var spd = 340 + game.level*16 + 40;
    switch (K.pat) {
      case "lead": fireAt(e, p.x + (p.vx || 0) * 22, p.y, spd); break;
      case "spread":
        fireAt(e, p.x-60, p.y, spd);
        fireAt(e, p.x,    p.y, spd);
        fireAt(e, p.x+60, p.y, spd);
        break;
      case "double":
        fireAt(e, p.x-26, p.y, spd);
        fireAt(e, p.x+26, p.y, spd);
        break;
      default: fireAt(e, p.x, p.y, spd);
    }
    SFX.enemyShoot();
  }
  function bossFire(e){
    var p = entities.player;
    if (!p) return;
    if (enemyBullets() >= enemyBulletCap()) return;
    var phase = e.bossPhase || 1;
    var spd = 320 + game.level*12 + 40;
    var kind = e.bossType || "fan";

    if (kind === "spiral") {
      var step = phase === 2 ? 0.28 : 0.35;
      e.spiralAngle = (e.spiralAngle || 0) + step;
      var arms = phase === 2 ? 5 : 3;
      for (var i = 0; i < arms; i++) {
        var a = e.spiralAngle + i * Math.PI * 2 / arms;
        if (Math.sin(a) <= 0) continue;
        entities.bullets.push({
          x: e.x, y: e.y + 30,
          vx: Math.cos(a) * spd * 0.75,
          vy: Math.sin(a) * spd * 0.75,
          r: 11, color: "enemy"
        });
      }
    } else {
      if (phase === 1) {
        fireAt(e, p.x, p.y, spd);
        if (Math.random() < 0.4) {
          fireAt(e, p.x-90, p.y, spd*0.95);
          fireAt(e, p.x+90, p.y, spd*0.95);
        }
      } else {
        fireAt(e, p.x-140, p.y, spd*0.9);
        fireAt(e, p.x-70,  p.y, spd);
        fireAt(e, p.x,     p.y, spd*1.05);
        fireAt(e, p.x+70,  p.y, spd);
        fireAt(e, p.x+140, p.y, spd*0.9);
      }
    }
    SFX.enemyShoot();
  }

  function maybeDropPowerup(x, y){
    var rate = Math.min(0.22, 0.08 + game.level*0.007);
    if (Math.random() >= rate) return;
    var weights = { spread:3, rapid:3, shield:3, health:2, bomb:2, warp:2 };
    var pool = [];
    Object.keys(weights).forEach(function(k){
      for (var i=0;i<weights[k];i++) pool.push(k);
    });
    var type = pool[(Math.random()*pool.length)|0];
    entities.powerups.push({ x:x, y:y, vy:150, type:type, r:24, phase:0 });
  }
  function rollEvent(){
    var roll = Math.random();
    var pool = ["doubleScore","richGold","harsh","rushed"];
    return roll < 0.55 ? pool[(Math.random()*pool.length)|0] : null;
  }
  function eventEffect(){
    var e = game.event;
    if (!e) return {};
    if (e === "doubleScore") return { score: 2 };
    if (e === "richGold")    return { gold: 2 };
    if (e === "harsh")       return { enemies: 1.4 };
    if (e === "rushed")      return { speed: 1.3 };
    return {};
  }
  function applyPowerup(type){
    var p = entities.player;
    if (type === "spread")      game.spreadShot = 6000;
    else if (type === "rapid")  game.rapidTimer = 6000;
    else if (type === "shield") game.shield = 5000;
    else if (type === "warp")   game.slowTimer = 6000;
    else if (type === "health") {
      game.lives = Math.min(10, game.lives + 1);
      addFloat(p?p.x:LOG_W/2, (p?p.y:LOG_H/2)-40, t("one_life"), "#7dff8b", 24);
    }
    else if (type === "bomb") {
      if (game.bombCd > 0) return false;
      game.bombCd = 8000;
      var cleared = 0;
      for (var i = entities.bullets.length-1; i >= 0; i--){
        var b = entities.bullets[i];
        if (b.color === "enemy") { game.score += 15; cleared++; entities.bullets.splice(i,1); }
      }
      if (p) p.invuln = Math.max(p.invuln, 700);
      game.shake = Math.max(game.shake, 10);
      flashScreen("#ffcf4a", 0.35, 250);
      SFX.explosion();
      addFloat(p?p.x:LOG_W/2, (p?p.y:LOG_H/2)-40, t("blast")+(cleared*15), "#ffcf4a", 26);
    }
    SFX.powerup(); haptic(20);
    addFloat(p?p.x:LOG_W/2, (p?p.y:LOG_H/2) - (p?p.h:20), t("powerup"), "#4ad9ff", 22);
    return true;
  }

  function bossPhaseChange(e){
    var prev = e.bossPhase || 1;
    var cur = e.hp <= e.hpMax/2 ? 2 : 1;
    if (cur !== prev) {
      e.bossPhase = cur;
      if (cur === 2) {
        addFloat(e.x, e.y - 120, t("phase2"), "#ffcf4a", 34, 1400);
        game.shake = Math.max(game.shake, 12);
        flashScreen("#ff5a4d", 0.28, 400);
        SFX.levelup();
      }
    }
  }
  function spawnExplosion(x, y, big){
    entities.effects.push({ x:x, y:y, frame:0, total:9, life:0, max:760 });
    var count = big ? 14 : 10;
    if (reducedMotion()) count = Math.max(4, count >> 1);
    for (var i=0;i<count;i++){
      var a = Math.random()*Math.PI*2;
      var sp = 120 + Math.random()*260;
      entities.particles.push({
        x:x, y:y, vx:Math.cos(a)*sp, vy:Math.sin(a)*sp,
        life:0, max:500+Math.random()*400, size:2+Math.random()*3,
        color: Math.random()<0.5 ? "#ffcf4a" : "#ff7a3d"
      });
    }
    SFX.explosion();
  }
  function addFloat(x, y, text, color, size, maxMs){
    entities.text.push({
      x:x, y:y, life:0, max: maxMs || 900,
      text: text, color: color || "#ffcf4a",
      size: size || 26, vy: -40
    });
  }

  // =========================================================
  //  Game flow
  // =========================================================
  function startRun(){
    if (state === STATE.PLAYING) return;

    if (!isOwned(game.selectedShip)) {
      var sel = shipById(game.selectedShip);
      if (sel && sel.premium) {
        addFloat(LOG_W/2, LOG_H*0.5, t("premium_label"), "#ffcf4a", 22, 1800);
        openShop();
        return;
      }
      game.selectedShip = 1;
    }

    state = STATE.PLAYING;
    gameOverLock = false;
    game.ship = applyUpgrades(shipById(game.selectedShip), game.selectedShip);

    hideCenter(); showHUD();
    adsHideBanner();

    game.time = 0; game.score = 0; game.gold = 0;
    game.level = 1; game.levelTimer = 0;
    game.streak = 0; game.streakTimer = 0; game.mult = 1;
    game.lives = Math.max(1, game.ship.lp);
    game.shield = 0; game.spreadShot = 0; game.bombCd = 0;
    game.fireTimer = 0; game.shake = 0; game.slowTimer = 0; game.rapidTimer = 0;
    game.x2Taken = false;
    game.event = rollEvent();
    game.spawnMeteor = 0.6; game.spawnShip = 1.5; game.nextBoss = 75;

    entities.bullets = []; entities.enemies = []; entities.effects = [];
    entities.particles = []; entities.powerups = []; entities.text = [];
    entities.player = makePlayer();

    pointer.x = LOG_W/2; pointer.y = LOG_H*0.82;
    window.AudioManager.unlock();
    recordPlay();

    if (!persistent.tutorialSeen) {
      persistent.tutorialSeen = true;
      savePersistent();
      addFloat(LOG_W/2, LOG_H*0.60, t("drag_to_move"), "#4ad9ff", 26, 2600);
      addFloat(LOG_W/2, LOG_H*0.66, t("auto_fire"), "#4ad9ff", 20, 2600);
      addFloat(LOG_W/2, LOG_H*0.71, t("pause_key"), "#7fa6c9", 15, 2600);
    }
  }

  function playerHit(){
    var p = entities.player;
    if (p && p.invuln > 0) return;
    if (game.shield > 0) {
      game.shield = 0;
      if (p) p.invuln = 1200;
      game.shake = Math.max(game.shake, 8);
      flashScreen("#4ad9ff", 0.20, 220);
      addFloat(p?p.x:LOG_W/2, (p?p.y:LOG_H/2)-60, t("shield"), "#4ad9ff", 24);
      SFX.hit(); haptic(30);
      return;
    }
    game.lives--;
    if (p) p.invuln = 2000;
    game.shake = Math.max(game.shake, 20);
    game.streak = 0; game.mult = 1; game.streakTimer = 0;
    flashScreen("#ff3a4a", 0.42, 320);
    SFX.damage(); haptic(70);
    for (var i=0;i<16;i++){
      var a = Math.random()*Math.PI*2, sp = 100 + Math.random()*300;
      entities.particles.push({
        x:p?p.x:LOG_W/2, y:p?p.y:LOG_H/2,
        vx:Math.cos(a)*sp, vy:Math.sin(a)*sp,
        life:0, max:600, size:2+Math.random()*3, color:"#9fe9ff"
      });
    }
    if (game.lives <= 0) gameOver();
  }

  function addScore(base, goldBase, x, y){
    game.streak++;
    game.streakTimer = COMBO_MS;
    game.mult = 1 + Math.floor(game.streak/5);
    var eff = eventEffect();
    var gained = base * game.mult * (eff.score || 1);
    game.score += gained;
    game.gold += Math.floor(goldBase * (eff.gold || 1));
    addFloat(x || LOG_W/2, y || 100, "+"+gained, "#ffcf4a", 22, 700);

    if (game.streak === 10) {
      addFloat(LOG_W/2, LOG_H*0.32, t("rampage"), "#ffcf4a", 40, 1500);
      flashScreen("#ffcf4a", 0.20, 300); SFX.levelup(); haptic(40);
    } else if (game.streak === 25) {
      addFloat(LOG_W/2, LOG_H*0.32, t("unstoppable"), "#ff5a4d", 42, 1600);
      flashScreen("#ff5a4d", 0.25, 320); SFX.levelup(); haptic(60);
    } else if (game.streak === 50) {
      addFloat(LOG_W/2, LOG_H*0.32, t("legendary"), "#9fe9ff", 46, 1800);
      flashScreen("#9fe9ff", 0.28, 360); SFX.levelup(); haptic(80);
    }
  }

  function gameOver(){
    if (gameOverLock || state === STATE.GAMEOVER) return;
    gameOverLock = true;
    state = STATE.GAMEOVER;

    var isNewBest = false;
    try {
      persistent.gold += game.gold || 0;
      isNewBest = game.score > persistent.best;
      if (isNewBest) persistent.best = game.score;
      savePersistent(true);
    } catch (e) { console.error("gameOver save error:", e); }

    try { SFX.levelup(); } catch(e){}
    adsInterstitial();
    hideHUD();
    showGameOver(isNewBest);
    adsShowBanner();

    // Push notifications: ask permission once, then reschedule every loss.
    if (window.NativePush) {
      var dailyClaimed = !canClaimDaily();
      if (!persistent.notifAsked) {
        persistent.notifAsked = true;
        savePersistent();
        NativePush.requestPermission().then(function(){
          pushReschedule(dailyClaimed);
        }).catch(function(){});
      } else {
        pushReschedule(dailyClaimed);
      }
    }
  }

  function togglePause(){
    if (state === STATE.PLAYING) pauseGame();
    else if (state === STATE.PAUSED) resumeGame();
  }
  function pauseGame(){
    if (state!==STATE.PLAYING) return;
    state = STATE.PAUSED;
    savePersistent(true);
    showPause();
  }
  function resumeGame(){
    if (state!==STATE.PAUSED) return;
    state = STATE.PLAYING; hideCenter(); lastTs = performance.now();
    adsHideBanner();
  }
  function quitToMenu(){
    state = STATE.TITLE;
    hideHUD();
    savePersistent(true);
    showTitle();
    adsShowBanner();
  }

  // =========================================================
  //  Update
  // =========================================================
  function update(dtMs){
    var dtSec = dtMs / 1000;
    game.time += dtSec;
    var eff = eventEffect();
    var slow = game.slowTimer > 0 ? 0.6 : 1;
    var sf = eff.speed || 1;
    var dte = dtSec * slow * sf;
    var spawnMul = eff.enemies || 1;

    if (screenFlash.alpha > 0) screenFlash.alpha = Math.max(0, screenFlash.alpha - screenFlash.decay * dtMs);

    var p = entities.player;
    if (p) {
      var targetX = pointer.x, targetY = pointer.y;
      if (keys.left || keys.right || keys.up || keys.down) {
        var speed = 620 * game.ship.spd * dtSec;
        if (keys.left)  targetX = p.x - speed;
        if (keys.right) targetX = p.x + speed;
        if (keys.up)    targetY = p.y - speed;
        if (keys.down)  targetY = p.y + speed;
        targetX = clamp(targetX, VIS_LEFT, VIS_RIGHT);
        targetY = clamp(targetY, LOG_H*0.34, LOG_H*0.94);
        pointer.x = targetX; pointer.y = targetY;
      }
      var nx = p.x + (targetX - p.x) * Math.min(1, 12*dtSec);
      var ny = p.y + (targetY - p.y) * Math.min(1, 12*dtSec);
      p.vx = (nx - p.x);
      p.x = clamp(nx, VIS_LEFT, VIS_RIGHT); p.y = ny;
      if (p.vx > 4) p.facing = 1; else if (p.vx < -4) p.facing = -1;
      p.tilt += (clamp(p.vx/220, -1, 1) - p.tilt) * Math.min(1, 8*dtSec);
      var targetDrift = clamp(p.vx * 1.8, -6, 6);
      p.driftX += (targetDrift - p.driftX) * Math.min(1, 10*dtSec);
      p.invuln = Math.max(0, p.invuln - dtMs);
      p.enginePhase += dtSec;

      var baseCd = game.ship.cd * BASE_CD;
      if (game.rapidTimer > 0) baseCd *= 0.70;
      game.fireTimer -= dtMs;
      if (game.fireTimer <= 0) { firePlayerBullets(); game.fireTimer = baseCd; }
    }

    game.shield     = Math.max(0, game.shield - dtMs);
    game.spreadShot = Math.max(0, game.spreadShot - dtMs);
    game.rapidTimer = Math.max(0, game.rapidTimer - dtMs);
    game.bombCd     = Math.max(0, game.bombCd - dtMs);
    game.slowTimer  = Math.max(0, game.slowTimer - dtMs);
    game.shake      = Math.max(0, game.shake - dtMs*0.06);

    if (game.streak > 0) {
      game.streakTimer -= dtMs;
      if (game.streakTimer <= 0) { game.streak = 0; game.mult = 1; }
    }

    game.levelTimer += dtMs;
    if (game.levelTimer >= LEVEL_MS) {
      game.level++;
      game.levelTimer -= LEVEL_MS;
      persistent.bestLevel = Math.max(persistent.bestLevel || 0, game.level);
      var sector = (game.level % 5 === 0);
      var reward = sector ? (40 + 12 * game.level) : (10 + 8 * game.level);
      persistent.gold += reward;
      addFloat(LOG_W/2, LOG_H*0.38,
        (sector ? t("sector_clear") : t("level_up")+game.level) + " +" + reward + "◈",
        sector ? "#ffcf4a" : "#4ad9ff", sector ? 34 : 30, 1500);
      flashScreen(sector ? "#ffcf4a" : "#4ad9ff", sector ? 0.30 : 0.22, 400);
      SFX.levelup();
      savePersistent();
    }

    game.spawnMeteor -= dtSec * spawnMul;
    if (game.spawnMeteor <= 0 && enemyCount() < enemyCap()) {
      spawnMeteor();
      game.spawnMeteor = Math.max(0.30, 1.00 - game.level * 0.06);
    }
    game.spawnShip -= dtSec * spawnMul;
    if (game.spawnShip <= 0 && enemyCount() < enemyCap()) {
      spawnEnemyShip();
      game.spawnShip = Math.max(0.80, 3.50 - game.level * 0.20);
    }
    game.nextBoss -= dtSec;
    if (game.nextBoss <= 0 && !hasBoss()) { spawnBoss(); game.nextBoss = 90; }

    var b, i, j, e, pu;
    var bullets = entities.bullets;
    for (i = bullets.length-1; i >= 0; i--){
      b = bullets[i];
      b.x += b.vx * dtSec; b.y += b.vy * dtSec;
      if (b.y < -30 || b.y > LOG_H+30 || b.x < -30 || b.x > LOG_W+30) bullets.splice(i,1);
    }
    if (bullets.length > 520) bullets.splice(0, bullets.length - 520);

    var enemies = entities.enemies;
    var bossTargetY = LOG_H * 0.16;
    for (i = enemies.length-1; i >= 0; i--){
      e = enemies[i];
      if (e.type === "boss") {
        bossPhaseChange(e);
        var phase = e.bossPhase || 1;
        e.phase += dte;
        e.x = e.baseX + Math.sin(e.phase) * (phase === 2 ? 200 : e.amplitude);
        e.x = clamp(e.x, VIS_LEFT, VIS_RIGHT);
        if (e.y < bossTargetY) e.y = Math.min(bossTargetY, e.y + e.vy * dte);
        else e.y = bossTargetY + Math.sin(e.phase*0.7) * 8;

        e.escortTimer -= dtMs;
        if (e.escortTimer <= 0) {
          e.escortTimer = (phase === 2) ? 5000 : 8000;
          var sides = Math.random() < 0.5 ? [-1, 1] : [1, -1];
          for (var s = 0; s < 2; s++) {
            var sgn = sides[s];
            var sx = e.x + sgn * 90;
            if (sx > VIS_LEFT && sx < VIS_RIGHT) {
              var baseHp = 5 + game.level * 6;
              enemies.push({
                type:"ship", sprite:img("enemy"),
                x:sx, y:e.y + 20, baseX:sx, kind:"basic",
                vy:120,
                r:52, hp:Math.round(baseHp*0.8), hpMax:Math.round(baseHp*0.8),
                angle:Math.PI, score:250, gold: KILL_GOLD.basic,
                shootTimer: 1400 + Math.random()*600,
                amplitude: 0, phase: 0, flash: 0
              });
            }
          }
        }
        if (e.y > LOG_H * 0.10) {
          e.shootTimer -= dtMs;
          if (e.shootTimer <= 0) {
            bossFire(e);
            e.shootTimer = (phase === 2 ? 520 : 800) + Math.random() * 260;
          }
        }
        if (e.flash > 0) e.flash -= dtMs;
      } else if (e.type === "meteor") {
        e.x += e.vx * dte; e.y += e.vy * dte; e.angle += e.spin * dte;
        e.x = clamp(e.x, VIS_LEFT + e.r, VIS_RIGHT - e.r);
      } else {
        e.phase += dte;
        e.x = e.baseX + Math.sin(e.phase) * e.amplitude;
        e.x = clamp(e.x, VIS_LEFT, VIS_RIGHT);
        e.y += e.vy * dte;
        if (e.y > 20 && e.y < LOG_H*0.80) {
          e.shootTimer -= dtMs;
          if (e.shootTimer <= 0) {
            enemyFire(e);
            var baseKcd = KINDS[e.kind].cd;
            var levelScale = Math.max(0.55, 1 - game.level * 0.025);
            e.shootTimer = baseKcd * levelScale * (0.75 + Math.random()*0.4);
          }
        }
        if (e.flash > 0) e.flash -= dtMs;
      }
      if (e.y > LOG_H + 120) enemies.splice(i, 1);
    }

    for (i = bullets.length-1; i >= 0; i--){
      b = bullets[i];
      if (b.color === "enemy") continue;
      for (j = enemies.length-1; j >= 0; j--){
        e = enemies[j];
        if (Math.hypot(b.x - e.x, b.y - e.y) < e.r + b.r) {
          bullets.splice(i,1);
          e.flash = 120;
          var dmg = b.dmg || 1;
          e.hp -= dmg;
          SFX.hit();
          var isCrit = dmg >= 2.5;
          addFloat(e.x + (Math.random()-0.5)*22, e.y - 20,
            (isCrit ? "★ " : "") + Math.round(dmg),
            isCrit ? "#ffcf4a" : "#ffffff", isCrit ? 20 : 14, 450);
          for (var k=0;k<4;k++){
            var aa = Math.random()*Math.PI*2, sp2 = 80 + Math.random()*140;
            entities.particles.push({
              x:b.x, y:b.y, vx:Math.cos(aa)*sp2, vy:Math.sin(aa)*sp2,
              life:0, max:350, size:2, color:"#9fe9ff"
            });
          }
          if (e.hp <= 0) {
            addScore(e.score, e.gold || 2, e.x, e.y);
            if (e.type === "meteor") spawnExplosion(e.x, e.y, false);
            else spawnExplosion(e.x, e.y, true);
            maybeDropPowerup(e.x, e.y);
            enemies.splice(j, 1);
            SFX.death(); haptic(15);
          }
          break;
        }
      }
    }

    if (state !== STATE.PLAYING) return;
    if (p && p.invuln <= 0) {
      for (i = bullets.length-1; i >= 0; i--){
        b = bullets[i];
        if (b.color !== "enemy") continue;
        if (Math.hypot(b.x - p.x, b.y - p.y) < 34 + b.r) {
          bullets.splice(i, 1);
          playerHit();
          if (state !== STATE.PLAYING) return;
          break;
        }
      }
    }
    if (p && p.invuln <= 0) {
      for (i = enemies.length-1; i >= 0; i--){
        e = enemies[i];
        if (Math.hypot(e.x - p.x, e.y - p.y) < e.r*0.7 + 30) {
          if (e.type === "meteor") { e.vy *= -0.4; e.y -= 4; }
          else { enemies.splice(i, 1); spawnExplosion(e.x, e.y, true); }
          playerHit();
          if (state !== STATE.PLAYING) return;
          break;
        }
      }
    }

    var pwr = entities.powerups;
    for (i = pwr.length-1; i >= 0; i--){
      pu = pwr[i];
      pu.y += pu.vy * dtSec;
      pu.phase += dtSec * 4;
      if (pu.y > LOG_H + 40) { pwr.splice(i, 1); continue; }
      if (p && Math.hypot(pu.x - p.x, pu.y - p.y) < pu.r + 40) {
        if (applyPowerup(pu.type) !== false) pwr.splice(i, 1);
      }
    }

    var fx = entities.effects;
    for (i = fx.length-1; i >= 0; i--){
      fx[i].life += dtMs;
      fx[i].frame = Math.floor((fx[i].life / fx[i].max) * fx[i].total);
      if (fx[i].life >= fx[i].max) fx.splice(i, 1);
    }
    var pt = entities.particles;
    for (i = pt.length-1; i >= 0; i--){
      pt[i].life += dtMs;
      pt[i].x += pt[i].vx * dtSec; pt[i].y += pt[i].vy * dtSec;
      pt[i].vx *= 0.94; pt[i].vy *= 0.94;
      if (pt[i].life >= pt[i].max) pt.splice(i, 1);
    }
    var tx = entities.text;
    for (i = tx.length-1; i >= 0; i--){
      tx[i].life += dtMs;
      tx[i].y += tx[i].vy * dtSec;
      if (tx[i].life >= tx[i].max) tx.splice(i, 1);
    }
  }

  // =========================================================
  //  Render
  // =========================================================
  var stars = [];
  function initStars(){
    stars = [];
    var layers = [[1,0.30],[2,0.55],[3,1.0]];
    layers.forEach(function(l){
      var count = l[0]===3 ? 40 : (l[0]===2 ? 26 : 16);
      for (var i=0;i<count;i++){
        stars.push({
          x:Math.random()*LOG_W, y:Math.random()*LOG_H,
          speed:l[1], size:l[0]===3?2.4:(l[0]===2?1.6:1.0),
          tw:Math.random()*Math.PI*2, col:Math.random()<0.15?"#bff0ff":"#ffffff"
        });
      }
    });
  }
  function drawBackground(){
    var g = ctx.createLinearGradient(0,0,0,LOG_H);
    g.addColorStop(0,"#0a1230"); g.addColorStop(0.55,"#070a1c"); g.addColorStop(1,"#05060f");
    ctx.fillStyle = g; ctx.fillRect(0,0,LOG_W,LOG_H);

    ctx.globalCompositeOperation = "lighter";
    var tV = visualTime * 0.00005;
    var gx = LOG_W * (0.5 + Math.sin(tV)*0.28);
    var gy = LOG_H * (0.35 + Math.cos(tV*0.8)*0.12);
    var ng = ctx.createRadialGradient(gx, gy, 10, gx, gy, 420);
    ng.addColorStop(0, "rgba(90,60,200,0.20)");
    ng.addColorStop(1, "rgba(90,60,200,0)");
    ctx.fillStyle = ng; ctx.fillRect(0,0,LOG_W,LOG_H);
    var gx2 = LOG_W * (0.5 + Math.cos(visualTime*0.00006)*0.3);
    var gy2 = LOG_H * (0.72 + Math.sin(tV*0.7)*0.1);
    var ng2 = ctx.createRadialGradient(gx2, gy2, 10, gx2, gy2, 380);
    ng2.addColorStop(0, "rgba(30,120,200,0.16)");
    ng2.addColorStop(1, "rgba(30,120,200,0)");
    ctx.fillStyle = ng2; ctx.fillRect(0,0,LOG_W,LOG_H);
    ctx.globalCompositeOperation = "source-over";

    var seconds = dt / 1000;
    for (var i=0;i<stars.length;i++){
      var st = stars[i];
      st.y += st.speed * BASE_STAR_SPEED * seconds;
      if (st.y > LOG_H) { st.y -= LOG_H; st.x = Math.random()*LOG_W; }
      st.tw += 0.05;
      ctx.globalAlpha = 0.5 + 0.5*Math.sin(st.tw);
      ctx.fillStyle = st.col;
      ctx.beginPath(); ctx.arc(st.x, st.y, st.size, 0, Math.PI*2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  function drawPlayer(){
    var p = entities.player;
    if (!p) return;
    var isPremium = (game.selectedShip === PREMIUM_SHIP_ID);

    var ef = img("engine_" + ((Math.floor(p.enginePhase*12) % 4) + 1));
    if (ef) {
      ctx.save(); ctx.globalAlpha = 0.85;
      var flick = 1 + Math.sin(p.enginePhase*30)*0.12;
      if (isPremium) ctx.globalAlpha = 0.95;
      drawBottomCenter(ef, p.x + (p.driftX || 0) * 0.5, p.y + 6, 44, 70*flick);
      ctx.restore();
    }

    if (p.invuln > 0 && Math.floor(p.invuln/90) % 2 === 0) return;

    ctx.save();
    ctx.translate(p.x + (p.driftX || 0), p.y);
    ctx.rotate(p.tilt * 0.55);
    if (isPremium) {
      ctx.shadowColor = "rgba(255,207,74,0.95)";
      ctx.shadowBlur = 30;
    } else {
      ctx.shadowColor = "rgba(74,217,255,0.8)";
      ctx.shadowBlur = 22;
    }
    var spriteId = shipSpriteId(game.selectedShip);
    var shipImg = img("ship" + spriteId) || img("hero");
    drawBottomCenter(shipImg, 0, 0, 106, 80);
    ctx.restore();

    if (isPremium) {
      ctx.save();
      ctx.globalAlpha = 0.55 + 0.30 * Math.sin(game.time * 4);
      ctx.strokeStyle = "#ffcf4a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(p.x + (p.driftX || 0), p.y - 10, 46, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    if (game.shield > 0) {
      ctx.save();
      ctx.globalAlpha = 0.5 + 0.3*Math.sin(game.time*8);
      ctx.strokeStyle = "#4ad9ff"; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(p.x + (p.driftX || 0), p.y-10, 62, 0, Math.PI*2); ctx.stroke();
      ctx.restore();
    }
  }
  function drawEnemy(e){
    if (e.type === "meteor") {
      ctx.save();
      if (e.flash > 0) { ctx.shadowColor = "#ffffff"; ctx.shadowBlur = 26; }
      ctx.translate(e.x, e.y); ctx.rotate(e.angle);
      drawCenter(e.sprite, 0, 0, e.r*1.5, e.r*1.5);
      ctx.restore();
      return;
    }
    if (e.type === "boss") {
      var bw = 240, bx = e.x - bw/2, by = e.y - 170;
      ctx.save();
      ctx.fillStyle = "rgba(0,0,0,0.55)"; ctx.fillRect(bx, by, bw, 14);
      ctx.fillStyle = "#ff5a4d";           ctx.fillRect(bx, by, bw * Math.max(0, e.hp/e.hpMax), 14);
      ctx.strokeStyle = "rgba(255,255,255,0.35)"; ctx.lineWidth = 1;
      ctx.strokeRect(bx, by, bw, 14);
      ctx.restore();
      ctx.save();
      if (e.flash > 0) { ctx.shadowColor = "#ffffff"; ctx.shadowBlur = 30; }
      else { ctx.shadowColor = "rgba(255,90,77,0.9)"; ctx.shadowBlur = 30; }
      ctx.translate(e.x, e.y);
      drawBottomCenter(e.sprite, 0, 0, 180, 260);
      ctx.restore();
      if (e.y < LOG_H * 0.10) {
        ctx.save();
        ctx.globalAlpha = 0.55 + 0.45 * Math.sin(visualTime * 0.008);
        ctx.fillStyle = "#ff5a4d";
        var ax = e.x, ay = LOG_H * 0.10 + 8;
        ctx.beginPath();
        ctx.moveTo(ax, ay); ctx.lineTo(ax - 14, ay - 24); ctx.lineTo(ax + 14, ay - 24);
        ctx.closePath(); ctx.fill();
        ctx.restore();
      }
      return;
    }
    ctx.save();
    var baseCol = (KINDS[e.kind] && KINDS[e.kind].color) || "rgba(255,77,94,0.85)";
    if (e.elite) baseCol = "rgba(255,207,74,0.95)";
    if (e.flash > 0) { ctx.shadowColor = "#ffffff"; ctx.shadowBlur = 26; }
    else ctx.shadowColor = baseCol;
    ctx.shadowBlur = e.elite ? 26 : 20;
    ctx.translate(e.x, e.y);
    ctx.scale(1, -1);
    drawBottomCenter(e.sprite, 0, 0, 96, 148);
    ctx.restore();

    if (e.elite) {
      ctx.save();
      ctx.globalAlpha = 0.45 + 0.25 * Math.sin(visualTime * 0.012 + e.x);
      ctx.strokeStyle = "rgba(255,207,74,0.9)";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(e.x, e.y, 52, 0, Math.PI*2); ctx.stroke();
      ctx.restore();
    }
    if (e.hp < e.hpMax) {
      var hbw = 50, hbh = 4, hbx = e.x - hbw/2, hby = e.y - 62;
      ctx.save();
      ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(hbx, hby, hbw, hbh);
      ctx.fillStyle = e.elite ? "#ffcf4a" : "#ff5a4d";
      ctx.fillRect(hbx, hby, hbw * (e.hp / e.hpMax), hbh);
      ctx.restore();
    }
  }
  function drawBullet(b){
    var isEnemy = (b.color === "enemy");
    var sprite;
    if (isEnemy) sprite = img("e_bullet_red1");
    else if (b.color === "blue") sprite = img("p_bullet_blue1");
    else if (b.color === "#7dff8b") sprite = img("p_bullet_green1");
    else sprite = img("p_bullet_blue2");
    if (!sprite) return;

    var rot = Math.atan2(b.vy, b.vx) + Math.PI / 2;

    ctx.save();
    ctx.shadowColor = isEnemy ? "#ff5a4d" :
      (b.color === "#ffcf4a" || b.color === "#fff3b0") ? "#ffcf4a" : "#4ad9ff";
    ctx.shadowBlur = 14;
    ctx.translate(b.x, b.y);
    ctx.rotate(rot);
    ctx.drawImage(sprite, -13, -26, 26, 52);
    ctx.restore();
  }
  function drawPowerup(pu){
    ctx.save();
    var c = pu.type === "spread" ? "#ffcf4a" : (pu.type === "bomb" ? "#ff7a3d" : "#4ad9ff");
    ctx.translate(pu.x, pu.y);
    ctx.rotate(Math.sin(pu.phase)*0.3);
    ctx.shadowColor = c; ctx.shadowBlur = 18;
    ctx.strokeStyle = c; ctx.lineWidth = 3;
    ctx.fillStyle = "rgba(10,16,34,0.85)";
    var s = pu.r;
    ctx.beginPath();
    ctx.moveTo(0,-s); ctx.lineTo(s,0); ctx.lineTo(0,s); ctx.lineTo(-s,0); ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = c;
    ctx.font = "bold 20px Segoe UI, sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    var label = pu.type === "spread" ? "S" : pu.type === "bomb" ? "B" :
                pu.type === "health" ? "+" : pu.type === "rapid" ? "R" :
                pu.type === "shield" ? "◇" : pu.type === "warp" ? "W" : "◆";
    ctx.fillText(label, 0, 1);
    ctx.restore();
  }
  function draw(){
    ctx.clearRect(0, 0, LOG_W, LOG_H);
    var sx = 0, sy = 0;
    if (!reducedMotion() && game.shake > 0.5) {
      sx = (Math.random()-0.5) * game.shake;
      sy = (Math.random()-0.5) * game.shake;
    }
    ctx.save();
    ctx.translate(sx, sy);

    drawBackground();
    entities.powerups.forEach(drawPowerup);
    entities.enemies.forEach(drawEnemy);
    entities.bullets.forEach(drawBullet);

    var pt = entities.particles;
    for (var i=0;i<pt.length;i++){
      var pp = pt[i];
      ctx.globalAlpha = Math.max(0, 1 - pp.life/pp.max);
      ctx.fillStyle = pp.color;
      ctx.beginPath(); ctx.arc(pp.x, pp.y, pp.size, 0, Math.PI*2); ctx.fill();
    }
    ctx.globalAlpha = 1;

    var fx = entities.effects;
    for (i=0;i<fx.length;i++){
      var ef = fx[i];
      var fi = Math.max(0, Math.min(ef.total-1, ef.frame));
      var sp = img("explode_" + (8 + fi));
      if (sp) {
        var prog = ef.life / ef.max;
        ctx.save();
        ctx.globalAlpha = prog < 0.7 ? 1 : Math.max(0, 1 - (prog-0.7)/0.3);
        var sc = 0.6 + prog*0.8;
        drawCenter(sp, ef.x, ef.y, 120*sc, 120*sc);
        ctx.restore();
      }
    }
    drawPlayer();

    var tx = entities.text;
    for (i=0;i<tx.length;i++){
      var tt = tx[i];
      ctx.globalAlpha = Math.max(0, 1 - tt.life/tt.max);
      ctx.fillStyle = tt.color;
      ctx.font = "bold " + (tt.size || 26) + "px Segoe UI, sans-serif";
      ctx.textAlign = "center";
      ctx.shadowColor = tt.color; ctx.shadowBlur = 10;
      ctx.fillText(tt.text, tt.x, tt.y);
    }
    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    ctx.restore();

    if (screenFlash.alpha > 0.001) {
      ctx.save();
      ctx.globalAlpha = screenFlash.alpha;
      ctx.fillStyle = screenFlash.color;
      ctx.fillRect(0, 0, LOG_W, LOG_H);
      ctx.restore();
    }
  }

  // =========================================================
  //  HUD
  // =========================================================
  var hudEl = null, centerEl = null;
  function ensureCenter(){
    if (!centerEl) centerEl = document.getElementById("center-ui");
    return centerEl;
  }
  function renderCenter(html){
    var c = ensureCenter(); if (!c) return;
    c.innerHTML = '<div class="center-content">' + html + '</div>';
  }
  function hideCenter(){ var c = ensureCenter(); if (c) c.classList.add("hidden"); }
  function showCenter(){ var c = ensureCenter(); if (c) c.classList.remove("hidden"); }

  function updateHUD(){
    var hudScore = document.getElementById("hud-score");
    var hudLvl   = document.getElementById("hud-lvl");
    var hudGold  = document.getElementById("hud-gold");
    var hudBestLabel = document.getElementById("hud-best-label");
    var hudBest  = document.getElementById("hud-best");
    var hearts   = document.getElementById("hearts");

    if (hudScore) hudScore.textContent = game.score.toLocaleString();
    if (hudLvl)   hudLvl.textContent = t("lv") + " " + game.level;
    if (hudGold)  hudGold.textContent = "◈ " + spendableGold().toLocaleString();
    if (hudBestLabel) hudBestLabel.textContent = t("best");
    if (hudBest) hudBest.textContent = persistent.best.toLocaleString();

    if (hearts) {
      var n = Math.min(10, Math.max(0, game.lives));
      if (hearts._n !== n) {
        hearts._n = n;
        var hh = "";
        for (var hi = 0; hi < n; hi++) hh += "<span>♥</span>";
        hearts.innerHTML = hh;
      }
      hearts.style.opacity = (n >= 3) ? 1 : (n === 2 ? 0.85 : 0.7);
    }

    var comboWrap = document.getElementById("hud-combo");
    var comboMult = document.getElementById("combo-mult");
    var comboFill = document.getElementById("combo-fill");
    if (comboWrap) {
      if (game.streak >= 2) {
        comboWrap.style.display = "flex";
        if (comboMult) comboMult.textContent = "×" + game.mult;
        if (comboFill) {
          var pct = Math.max(0, Math.min(1, game.streakTimer / COMBO_MS));
          comboFill.style.width = (pct * 100) + "%";
        }
      } else {
        comboWrap.style.display = "none";
      }
    }

    var pu = document.getElementById("hud-powerups");
    if (pu) {
      var any = false;
      function setPu(id, ms){
        var el = document.getElementById(id);
        if (!el) return;
        if (ms > 0) {
          el.textContent = el.textContent.replace(/\s\d+s$/, "") +
            (ms < 4000 ? " " + Math.ceil(ms/1000) + "s" : "");
          el.style.display = ""; any = true;
        } else el.style.display = "none";
      }
      setPu("pu-spread", game.spreadShot);
      setPu("pu-rapid",  game.rapidTimer);
      setPu("pu-shield", game.shield);
      setPu("pu-bomb",   game.bombCd);
      setPu("pu-warp",   game.slowTimer);
      pu.style.display = any ? "flex" : "none";
    }

    var ev = document.getElementById("hud-event");
    if (ev) {
      if (game.event) {
        ev.textContent = game.event.toUpperCase();
        ev.style.display = "";
      } else ev.style.display = "none";
    }
  }

  function showHUD(){
    if (!hudEl) hudEl = document.getElementById("hud");
    if (hudEl) hudEl.style.display = "flex";
    var pauseBtn = document.getElementById("pause-btn");
    if (pauseBtn && !pauseBtn._bound) {
      pauseBtn._bound = true;
      pauseBtn.onclick = function(){ SFX.hover(); togglePause(); };
    }
  }
  function hideHUD(){
    if (!hudEl) hudEl = document.getElementById("hud");
    if (hudEl) hudEl.style.display = "none";
  }

  // =========================================================
  //  Progression hint
  // =========================================================
  function progressionHint(){
    var gold = spendableGold();
    var bestUp = null;

    for (var i = 0; i < SHIP_DEFS.length; i++) {
      var s = SHIP_DEFS[i];
      if (!isOwned(s.id)) continue;
      var su = getShipUpgrades(s.id);
      for (var k in UPGRADE_CONFIG) {
        var lvl = su[k] || 0;
        var maxLvl = shipUpgradeMax(s.id, k);
        if (maxLvl > 0 && lvl < maxLvl) {
          var c = upgradeCost(k, lvl);
          if (c <= gold && (!bestUp || c < bestUp.cost)) {
            bestUp = { ship: s, key:k, label:t(UPGRADE_LABEL_KEY[k]), cost: c };
          }
        }
      }
    }

    var nextShip = null;
    for (var j = 0; j < SHIP_DEFS.length; j++) {
      var sj = SHIP_DEFS[j];
      if (sj.premium) continue;
      if (!isOwned(sj.id) && sj.cost <= gold) {
        if (!nextShip || sj.cost < nextShip.cost) nextShip = sj;
      }
    }
    if (nextShip && (!bestUp || nextShip.cost < bestUp.cost))
      return t("ready_to_buy") + nextShip.name;
    if (bestUp) return t("ready_to_upgrade") + bestUp.ship.name + " · " + bestUp.label;

    var futureShip = null;
    for (var jj = 0; jj < SHIP_DEFS.length; jj++) {
      var sjj = SHIP_DEFS[jj];
      if (sjj.premium) continue;
      if (!isOwned(sjj.id)) { if (!futureShip || sjj.cost < futureShip.cost) futureShip = sjj; break; }
    }
    if (futureShip) return t("save_for") + futureShip.name + " (◈ " + futureShip.cost + ")";
    return "";
  }

  // =========================================================
  //  Screens
  // =========================================================
  function showTitle(){
    state = STATE.TITLE;
    showCenter();
    var daily = canClaimDaily() ? '<button class="btn gold" id="btn-daily">' + t("daily") + '</button>' : '';

    var html =
      '<div class="game-title">COSMIC<br/>DEFENDER</div>' +
      '<div class="game-sub">' + t("tagline") + '</div>' +
      '<div class="ship-carousel">' +
        '<button class="carousel-btn" id="ship-prev">◄</button>' +
        '<div class="carousel-img-box"><img class="carousel-img" id="carousel-img" alt="" /></div>' +
        '<div class="carousel-info" id="carousel-info"></div>' +
        '<button class="carousel-btn" id="ship-next">►</button>' +
      '</div>' +
      '<button class="btn" id="btn-play">' + t("play") + '</button>' +
      '<div class="stat-row">' +
        '<div><div class="v">' + spendableGold().toLocaleString() + '</div><div class="l">' + t("gold") + '</div></div>' +
        '<div><div class="v">' + persistent.best.toLocaleString() + '</div><div class="l">' + t("best") + '</div></div>' +
        '<div><div class="v">' + (persistent.bestLevel || 0) + '</div><div class="l">' + t("lv") + '</div></div>' +
        '<div><div class="v">' + persistent.totalPlays + '</div><div class="l">' + t("flights") + '</div></div>' +
      '</div>' +
      daily +
      '<div class="btn-row">' +
        '<button class="btn ghost" id="btn-shop">' + t("shop") + '</button>' +
        '<button class="btn ghost" id="btn-grades">' + t("upgrades") + '</button>' +
        '<button class="btn ghost" id="btn-settings">⚙</button>' +
      '</div>' +
      '<div class="controls-hint">' + t("controls") + '</div>';

    renderCenter(html);
    refreshCarousel();

    document.getElementById("btn-play").onclick     = function(){ SFX.click(); startRun(); };
    document.getElementById("btn-shop").onclick     = function(){ SFX.click(); openShop(); };
    document.getElementById("btn-grades").onclick   = function(){ SFX.click(); openUpgrades(); };
    document.getElementById("btn-settings").onclick = function(){ SFX.click(); openSettings(); };
    document.getElementById("ship-prev").onclick    = function(){ SFX.hover(); selectPrevShip(); };
    document.getElementById("ship-next").onclick    = function(){ SFX.hover(); selectNextShip(); };
    if (daily) document.getElementById("btn-daily").onclick = function(){ claimDaily(); showTitle(); };
  }

  function refreshCarousel(){
    var s = shipById(game.selectedShip);
    var up = applyUpgrades(s, s.id);
    var owned = isOwned(s.id);

    var imgEl = document.getElementById("carousel-img");
    if (imgEl) {
      var src = shipSpritePath(s.id);
      if (imgEl.getAttribute("src") !== src) imgEl.setAttribute("src", src);
      imgEl.classList.toggle("locked", !owned);
      imgEl.classList.toggle("gold", !!s.premium);
    }

    var el = document.getElementById("carousel-info");
    if (!el) return;
    var lockLine = s.premium
      ? '<div class="carousel-lock">⭐ ' + t("premium_label") + '</div>'
      : (owned ? '' : '<div class="carousel-lock">◈ ' + s.cost + '</div>');
    el.innerHTML =
      '<div class="carousel-name">' + s.name + '</div>' +
      '<div class="carousel-stats">' + shipStatsText(up) + '</div>' +
      lockLine;
  }

  function showPause(){
    showCenter();
    renderCenter(
      '<div class="game-title" style="font-size:38px">' + t("paused") + '</div>' +
      '<button class="btn" id="btn-resume">' + t("resume") + '</button>' +
      '<button class="btn ghost" id="btn-quit">' + t("quit") + '</button>' +
      '<div class="controls-hint">' + t("pause_key") + '</div>'
    );
    document.getElementById("btn-resume").onclick = function(){ SFX.click(); resumeGame(); };
    document.getElementById("btn-quit").onclick   = function(){ SFX.click(); quitToMenu(); };
  }

  function showGameOver(isNewBest){
    showCenter();
    var reviveBtn = persistent.reviveUsed ? "" :
      '<button class="btn gold" id="btn-revive">' + t("revive") + '</button>';
    var x2Btn = game.x2Taken ? "" :
      '<button class="btn gold" id="btn-x2">' + t("x2_gold") + '</button>';
    var hint = progressionHint();
    var hintHtml = hint ? '<div class="game-sub" style="color:var(--cyan-bright);font-size:13px">' + hint + '</div>' : '';

    renderCenter(
      '<div class="game-sub" style="color:#ff8f9e;font-weight:800;letter-spacing:2px">' + t("gameover") + '</div>' +
      '<div class="big-score">' + game.score.toLocaleString() + '</div>' +
      '<div class="stat-row">' +
        '<div><div class="v">' + persistent.best.toLocaleString() + '</div><div class="l">' + t("best") + '</div></div>' +
        '<div><div class="v" style="color:var(--gold)">◈ ' + (game.gold || 0) + '</div><div class="l">' + t("earned") + '</div></div>' +
        (isNewBest ? '<div><div class="v" style="color:#ffcf4a">' + t("new_record") + '</div><div class="l">' + t("record") + '</div></div>' : '') +
      '</div>' +
      hintHtml +
      reviveBtn + x2Btn +
      '<div class="btn-row">' +
        '<button class="btn" id="btn-retry">' + t("play_again") + '</button>' +
        '<button class="btn ghost" id="btn-menu">' + t("menu") + '</button>' +
      '</div>'
    );

    document.getElementById("btn-retry").onclick = function(){ SFX.click(); startRun(); };
    document.getElementById("btn-menu").onclick  = function(){ SFX.click(); quitToMenu(); };

    if (reviveBtn) {
      document.getElementById("btn-revive").onclick = function(){
        SFX.hover();
        adsRewarded(function(won){
          if (won) {
            persistent.reviveUsed = true;
            savePersistent(true);
            game.lives = 1;
            if (entities.player) entities.player.invuln = 2000;
            game.streak = 0; game.mult = 1; game.streakTimer = 0;
            gameOverLock = false;
            state = STATE.PLAYING;
            hideCenter(); showHUD(); adsHideBanner();
            flashScreen("#4ad9ff", 0.25, 350);
            SFX.powerup();
            addFloat(entities.player.x, entities.player.y - 60, t("revived"), "#ffcf4a", 34, 1400);
          } else addFloat(LOG_W/2, LOG_H/2, t("no_signal"), "#ff8f9e", 24);
        });
      };
    }
    if (x2Btn) {
      document.getElementById("btn-x2").onclick = function(){
        SFX.click();
        adsRewarded(function(won){
          if (won) {
            persistent.gold += game.gold || 0;
            game.x2Taken = true;
            savePersistent(true);
            showGameOver(isNewBest);
          }
        });
      };
    }
  }

  function canClaimDaily(){
    var today = new Date().toISOString().slice(0,10);
    return persistent.lastDaily !== today;
  }
  function claimDaily(){
    if (!canClaimDaily()) return;
    persistent.lastDaily = new Date().toISOString().slice(0,10);
    persistent.gold += 50;
    savePersistent(true);
    try { SFX.powerup(); } catch(e){}
    pushReschedule(true);
  }

  function openShop(){ state = STATE.TOOLSHOP; showCenter(); renderShop(); }
  function closeShop(){
    if (!isOwned(game.selectedShip) && shipById(game.selectedShip).premium) {
      for (var i = SHIP_DEFS.length - 1; i >= 0; i--) {
        if (isOwned(SHIP_DEFS[i].id)) { game.selectedShip = SHIP_DEFS[i].id; break; }
      }
    }
    state = STATE.TITLE;
    showTitle();
  }

  function renderShop(){
    var html =
      '<div class="game-title" style="font-size:30px">' + t("ship_shop") + '</div>' +
      '<div class="game-sub" style="color:var(--gold)">◈ ' + t("gold") + ': ' + spendableGold().toLocaleString() + '</div>' +
      '<div class="ship-list">';
    for (var i=0;i<SHIP_DEFS.length;i++){
      var s = SHIP_DEFS[i];
      var owned = isOwned(s.id);
      var sel = game.selectedShip === s.id;
      var isPremium = !!s.premium;
      var clsRow = "ship-row";
      if (sel) clsRow += " selected";
      if (isPremium) clsRow += " premium";

      var lbl, btnCls = sel ? "btn" : "btn ghost";
      if (owned) lbl = sel ? t("selected") : t("select");
      else if (isPremium) { lbl = t("purchase"); btnCls = "btn premium"; }
      else lbl = "◈ " + s.cost;

      html += '<div class="' + clsRow + '">' +
        '<div class="ship-info">' +
          '<div class="ship-name">' + s.name + (isPremium ? ' ⭐' : '') + '</div>' +
          '<div class="ship-stat">' + shipStatsText(applyUpgrades(s, s.id)) + '</div>' +
        '</div>' +
        '<button class="' + btnCls + '" id="sbtn_' + s.id + '">' + lbl + '</button>' +
      '</div>';
    }
    html += '</div><button class="btn ghost" id="btn-shop-back">' + t("back") + '</button>';
    renderCenter(html);

    for (var j=0;j<SHIP_DEFS.length;j++){
      (function(id, premium){
        var btn = document.getElementById("sbtn_" + id);
        if (!btn) return;
        btn.onclick = function(){
          SFX.click();
          if (isOwned(id)) shopAction(id);
          else if (premium) purchasePremiumShip();
          else shopAction(id);
        };
      })(SHIP_DEFS[j].id, !!SHIP_DEFS[j].premium);
    }
    document.getElementById("btn-shop-back").onclick = function(){ SFX.click(); closeShop(); };
  }

  function shopAction(id){
    if (isOwned(id)) {
      game.selectedShip = id;
      try { SFX.powerup(); } catch(e){}
      renderShop(); return;
    }
    var s = shipById(id);
    if (s.premium) return;
    if (persistent.gold >= s.cost) {
      persistent.gold -= s.cost;
      persistent.ships[id] = true;
      game.selectedShip = id;
      savePersistent(true);
      try { SFX.powerup(); } catch(e){}
      renderShop();
    } else {
      addFloat(LOG_W/2, LOG_H*0.4, t("need_gold"), "#ffcf4a", 26);
    }
  }

  function purchasePremiumShip(){
    var btn = document.getElementById("sbtn_" + PREMIUM_SHIP_ID);
    if (btn) {
      btn.textContent = t("purchase_loading");
      btn.setAttribute("aria-disabled", "true");
    }
    billingPurchase(PREMIUM_PRODUCT_ID).then(function(result){
      if (result && result.success) {
        persistent.ships[PREMIUM_SHIP_ID] = true;
        game.selectedShip = PREMIUM_SHIP_ID;
        savePersistent(true);
        try { SFX.powerup(); } catch(e){}
        haptic(60);
        addFloat(LOG_W/2, LOG_H*0.4, t("purchase_success"), "#ffcf4a", 30, 1600);
        renderShop();
      } else {
        var key = (result && result.canceled) ? "purchase_canceled" : "purchase_failed";
        addFloat(LOG_W/2, LOG_H*0.4, t(key), "#ff5a4d", 22, 1600);
        if (btn) {
          btn.textContent = t("purchase");
          btn.removeAttribute("aria-disabled");
        }
      }
    });
  }

  function restorePurchases(){
    billingRestore().then(function(list){
      if (!list || !list.length) return;
      var changed = false;
      for (var i = 0; i < list.length; i++) {
        var p = list[i];
        var pid = p && (p.productID || p.productIdentifier);
        if (pid === PREMIUM_PRODUCT_ID && !persistent.ships[PREMIUM_SHIP_ID]) {
          persistent.ships[PREMIUM_SHIP_ID] = true;
          changed = true;
        }
      }
      if (changed) savePersistent(true);
    });
  }

  function openUpgrades(){
    state = STATE.UPGRADES;
    showCenter();
    renderUpgrades();
  }
  function closeUpgrades(){ state = STATE.TITLE; showTitle(); }

  function renderUpgrades(){
    var ship = shipById(game.selectedShip);
    var owned = isOwned(ship.id);
    var su = getShipUpgrades(ship.id);
    var totalMax = shipUpgradeMax(ship.id);

    var invested = 0;
    for (var q = 0; q < UPGRADE_KEYS.length; q++){
      invested += (su[UPGRADE_KEYS[q]] || 0);
    }

    var header =
      '<div class="game-title" style="font-size:28px">' + t("upgrades_title") + '</div>' +
      '<div class="game-sub" style="color:var(--cyan-bright);font-weight:700">' +
        t("upgrades_for") + ship.name +
      '</div>' +
      '<div class="game-sub" style="color:#9fbfe0;font-size:12px">' +
        invested + ' / ' + totalMax + ' LV' +
      '</div>' +
      '<div class="game-sub" style="color:var(--gold)">◈ ' + t("gold") + ': ' + spendableGold().toLocaleString() + '</div>';

    if (ship.premium && !owned) {
      renderCenter(
        header +
        '<div class="ship-list">' +
          '<div class="ship-row">' +
            '<div class="ship-info"><div class="ship-stat">' +
              t("no_upgrades_for_premium") +
            '</div></div>' +
          '</div>' +
        '</div>' +
        '<button class="btn ghost" id="btn-up-back">' + t("back") + '</button>'
      );
      document.getElementById("btn-up-back").onclick = function(){ SFX.click(); closeUpgrades(); };
      return;
    }

    var rows = "";
    for (var i = 0; i < UPGRADE_KEYS.length; i++){
      var k = UPGRADE_KEYS[i];
      var cfg = UPGRADE_CONFIG[k];
      var lvl = su[k] || 0;
      var maxLvl = shipUpgradeMax(ship.id, k);
      if (maxLvl <= 0) continue;
      var maxed = lvl >= maxLvl;
      var cost = maxed ? 0 : upgradeCost(k, lvl);
      var afford = persistent.gold >= cost;
      var curEff = cfg.effect(lvl);
      var nextEff = maxed ? t("max") : cfg.effect(lvl + 1);
      rows += '<div class="ship-row">' +
        '<div class="ship-info">' +
          '<div class="ship-name">' + t(UPGRADE_LABEL_KEY[k]) + '</div>' +
          '<div class="ship-stat">LV ' + lvl + '/' + maxLvl + ' · ' + curEff +
            (maxed ? '' : ' → ' + nextEff) + '</div>' +
        '</div>' +
        '<button class="btn" id="up-' + k + '"' +
          ((!afford && !maxed) || maxed ? ' aria-disabled="true"' : '') + '>' +
          (maxed ? t("max") : '◈ ' + cost) + '</button>' +
      '</div>';
    }

    renderCenter(
      header +
      '<div class="ship-list">' + rows + '</div>' +
      '<button class="btn ghost" id="btn-up-back">' + t("back") + '</button>' +
      '<div class="controls-hint">' + t("select_ship_hint") + '</div>'
    );

    for (var j = 0; j < UPGRADE_KEYS.length; j++){
      (function(k){
        var b = document.getElementById("up-" + k);
        if (b) b.onclick = function(){ SFX.click(); buyUpgrade(game.selectedShip, k); };
      })(UPGRADE_KEYS[j]);
    }
    document.getElementById("btn-up-back").onclick = function(){ SFX.click(); closeUpgrades(); };
  }

  function buyUpgrade(shipId, k){
    var su = getShipUpgrades(shipId);
    var lvl = su[k] || 0;
    var maxLvl = shipUpgradeMax(shipId, k);
    if (maxLvl <= 0 || lvl >= maxLvl) return;
    var cost = upgradeCost(k, lvl);
    if (persistent.gold >= cost) {
      persistent.gold -= cost;
      su[k] = lvl + 1;
      savePersistent(true);
      try { SFX.powerup(); } catch(e){}
      renderUpgrades();
    } else {
      addFloat(LOG_W/2, LOG_H*0.4, t("need_gold"), "#ffcf4a", 26);
    }
  }

  function openSettings(){ state = STATE.SETTINGS; showCenter(); renderSettings(); }
  function closeSettings(){ state = STATE.TITLE; showTitle(); }

  function renderSettings(){
    if (!persistent.settings) persistent.settings = { vibration: true, reducedMotion: false };
    var soundOn = SFX.enabled;
    var vibOn   = persistent.settings.vibration !== false;
    var rmOn    = !!persistent.settings.reducedMotion;

    function row(id, label, sub, valText){
      return '<div class="ship-row">' +
        '<div class="ship-info">' +
          '<div class="ship-name">' + label + '</div>' +
          (sub ? '<div class="ship-stat">' + sub + '</div>' : '') +
        '</div>' +
        '<button class="btn ghost" id="' + id + '">' + valText + '</button>' +
      '</div>';
    }

    renderCenter(
      '<div class="game-title" style="font-size:28px">' + t("settings_title") + '</div>' +
      '<div class="ship-list">' +
        row("set-sound", t("sound"), t("sound_sub"), soundOn ? t("on") : t("off")) +
        row("set-vib",   t("vibration"), t("vibration_sub"), vibOn ? t("on") : t("off")) +
        row("set-rm",    t("reduced_motion"), t("reduced_motion_sub"), rmOn ? t("on") : t("off")) +
        row("set-lang",  t("language"), LANG.toUpperCase(), "◄ ►") +
      '</div>' +
      '<button class="btn ghost" id="btn-set-back">' + t("back") + '</button>'
    );

    document.getElementById("set-sound").onclick = function(){ SFX.click(); toggleSound(); renderSettings(); };
    document.getElementById("set-vib").onclick = function(){
      SFX.click();
      persistent.settings.vibration = !vibOn;
      savePersistent(); renderSettings();
    };
    document.getElementById("set-rm").onclick = function(){
      SFX.click();
      persistent.settings.reducedMotion = !rmOn;
      savePersistent(); renderSettings();
    };
    document.getElementById("set-lang").onclick = function(){
      SFX.click();
      var i = LANG_ORDER.indexOf(LANG);
      var next = LANG_ORDER[(i + 1) % LANG_ORDER.length];
      setLang(next);
      savePersistent(); renderSettings();
    };
    document.getElementById("btn-set-back").onclick = function(){ SFX.click(); closeSettings(); };
  }

  function toggleSound(){
    var on = SFX.toggle();
    persistent.sound = on;
    savePersistent();
    return on;
  }

  // =========================================================
  //  Persistence — localStorage only
  // =========================================================
  function savePersistent(/*immediate*/){
    persistent.lastUpdate = Date.now();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(persistent)); } catch(e){}
  }

  function loadPersistentSync(){
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch(e){}
    if (saved) {
      persistent.best       = saved.best || 0;
      persistent.bestLevel  = saved.bestLevel || 0;
      persistent.totalPlays = saved.totalPlays || 0;
      persistent.reviveUsed = !!saved.reviveUsed;
      persistent.gold       = saved.gold || 0;
      persistent.sessions   = saved.sessions || 0;
      persistent.notifAsked = !!saved.notifAsked;
      persistent.ships      = saved.ships || { 1: true };
      persistent.shipUpgrades = saved.shipUpgrades || {};

      // Legacy migration: global `upgrades` → ship 1.
      if (saved.upgrades && typeof saved.upgrades === "object") {
        var u1 = persistent.shipUpgrades["1"] || emptyUpgrades();
        for (var kk in saved.upgrades) {
          if (typeof saved.upgrades[kk] === "number" && saved.upgrades[kk] > (u1[kk] || 0)) {
            u1[kk] = saved.upgrades[kk];
          }
        }
        persistent.shipUpgrades["1"] = u1;
      }

      if (typeof saved.sound === "boolean") persistent.sound = saved.sound;
      if (typeof saved.lastDaily === "string") persistent.lastDaily = saved.lastDaily;
      if (typeof saved.tutorialSeen === "boolean") persistent.tutorialSeen = saved.tutorialSeen;
      if (typeof saved.lastUpdate === "number") persistent.lastUpdate = saved.lastUpdate;
      if (saved.settings) {
        persistent.settings = {
          vibration: saved.settings.vibration !== false,
          reducedMotion: !!saved.settings.reducedMotion
        };
      }
      if (saved.language && I18N[saved.language]) setLang(saved.language);
    }
    persistent.language = LANG;
    try { document.documentElement.lang = LANG; } catch (e) {}
    if (!persistent.ships[1]) persistent.ships[1] = true;
    if (!persistent.shipUpgrades) persistent.shipUpgrades = {};
    if (!persistent.settings) persistent.settings = { vibration: true, reducedMotion: false };

    for (var sid in persistent.shipUpgrades) {
      var su = persistent.shipUpgrades[sid];
      var shipId = parseInt(sid, 10);
      if (!su || typeof su !== "object") { persistent.shipUpgrades[sid] = emptyUpgrades(); continue; }
      for (var uk in su) {
        if (typeof su[uk] !== "number" || su[uk] < 0) { su[uk] = 0; continue; }
        var statMax = shipUpgradeMax(shipId, uk);
        if (statMax > 0 && su[uk] > statMax) su[uk] = statMax;
      }
    }
    if (persistent.sound === false) SFX.suspend();
  }

  function recordPlay(){ persistent.totalPlays++; savePersistent(); }

  // =========================================================
  //  Loading
  // =========================================================
  function renderLoading(){
    if (bootOnce) return;
    bootOnce = true;
    var barEl = document.getElementById("load-bar");
    var txtEl = document.getElementById("load-text");
    if (barEl) barEl.style.width = "100%";
    if (txtEl) txtEl.textContent = t("ready");
    setTimeout(function(){
      var ls = document.getElementById("loading-screen");
      if (ls) ls.style.display = "none";
      startMain();
    }, 300);
  }

  // =========================================================
  //  Loop / start
  // =========================================================
  function loop(ts){
    if (!running) return;
    dt = ts - lastTs;
    lastTs = ts;
    if (dt > 100) dt = 100;
    visualTime += dt;
    try {
      if (state === STATE.PLAYING) { update(dt); updateHUD(); }
      draw();
    } catch (e) { console.error("Frame error:", e); }
    requestAnimationFrame(loop);
  }

  function startMain(){
    running = true;
    lastTs = performance.now();
    bindInput();
    resize();
    initStars();
    showTitle();

    adsShowBanner();

    requestAnimationFrame(loop);
  }

  function boot(){
    loadPersistentSync();

    var txtEl0 = document.getElementById("load-text");
    if (txtEl0) txtEl0.textContent = t("launching");

    SFX.preload(function(ratio){ AUDIO_PROGRESS = ratio; reportProgress(); });

    // Счётчик сессий + save
    persistent.sessions = (persistent.sessions || 0) + 1;
    savePersistent();

    // Notifications
    if (window.NativePush) {
      NativePush.init().then(function(){
        NativePush.cancelAll();
        NativePush.reschedule(LANG, !canClaimDaily());
      }).catch(function(){});
    }

    // Billing restore
    restorePurchases();

    // Native ads init
    if (window.NativeAds) {
      NativeAds.init().then(function(){
        if (state === STATE.TITLE || state === STATE.GAMEOVER ||
            state === STATE.TOOLSHOP || state === STATE.UPGRADES ||
            state === STATE.SETTINGS) {
          adsShowBanner();
        }
      });
    }

    preloadAssets().then(renderLoading);
  }

  window.addEventListener("load", function(){
    window.addEventListener("pointerdown", function once(){
      window.AudioManager.unlock();
      window.removeEventListener("pointerdown", once);
    }, { once:true });
    boot();
  });

  window.addEventListener("resize", resize);
  window.addEventListener("orientationchange", resize);

  window.Game._dbg = {
    game: game, entities: entities, persistent: persistent,
    state: function(){ return state; }, setState: function(s){ state = s; },
    LANG: function(){ return LANG; }, setLang: setLang, t: t,
    startRun: startRun, applyPowerup: applyPowerup, spawnBoss: spawnBoss,
    gameOver: gameOver, update: update, firePlayerBullets: firePlayerBullets,
    spawnEnemyShip: spawnEnemyShip, spawnMeteor: spawnMeteor,
    shopAction: shopAction, shipById: shipById, STATE: STATE, SHIP_DEFS: SHIP_DEFS,
    showTitle: showTitle, showPause: showPause, showGameOver: showGameOver,
    renderShop: renderShop, openShop: openShop, closeShop: closeShop,
    openUpgrades: openUpgrades, renderUpgrades: renderUpgrades,
    closeUpgrades: closeUpgrades, buyUpgrade: buyUpgrade,
    openSettings: openSettings, closeSettings: closeSettings, renderSettings: renderSettings,
    rollEvent: rollEvent, eventEffect: eventEffect, applyUpgrades: applyUpgrades,
    getShipUpgrades: getShipUpgrades, upgradeLevel: upgradeLevel,
    shipUpgradeMax: shipUpgradeMax, upgradeCost: upgradeCost,
    addScore: addScore, togglePause: togglePause, quitToMenu: quitToMenu,
    toggleSound: toggleSound, recordPlay: recordPlay, updateHUD: updateHUD,
    startMain: startMain, savePersistent: savePersistent,
    canClaimDaily: canClaimDaily, claimDaily: claimDaily,
    flashScreen: flashScreen, haptic: haptic, reducedMotion: reducedMotion,
    purchasePremiumShip: purchasePremiumShip, restorePurchases: restorePurchases,
    PREMIUM_SHIP_ID: PREMIUM_SHIP_ID, PREMIUM_PRODUCT_ID: PREMIUM_PRODUCT_ID,
    NativePush: window.NativePush, pushReschedule: pushReschedule,
    VIS: function(){ return { left: VIS_LEFT, right: VIS_RIGHT, scale: scale }; }
  };
})();
