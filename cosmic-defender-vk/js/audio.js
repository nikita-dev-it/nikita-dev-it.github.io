/* audio.js — sound manager. Loads webm (opus) first for smaller size,
 * falls back to mp3. All sounds from Kenney/radius-raid (CC0/MIT). */
(function () {
  "use strict";

  var SFX = {
    _pool: {},
    volume: 0.6,
    enabled: true,

    names: [
      "shoot-0", "shootAlt-0", "explosion-0", "explosion-1", "explosionAlt-0",
      "hit-0", "hit-1", "hit-2", "death-0", "powerup-0",
      "click-0", "hover-0", "takingDamage-0", "levelup-0"
    ],

    preload: function (onProgress) {
      var self = this;
      var toLoad = this.names.length;
      var loaded = 0;
      this.names.forEach(function (name) {
        self._load(name, ["webm", "mp3"], function () {
          loaded++;
          if (onProgress) onProgress(loaded / toLoad);
        });
      });
    },

    _load: function (name, formats, done) {
      var self = this;
      var src = null;
      for (var i = 0; i < formats.length; i++) {
        if (this._fmtSupported(formats[i])) { src = "audio/" + name + "." + formats[i]; break; }
      }
      if (!src) { if (done) done(); return; }
      var audio = new Audio();
      audio.preload = "auto";
      audio.oncanplay = function () {
        self._pool[name] = audio;
        if (done) done();
      };
      audio.onerror = function () { if (done) done(); };
      audio.src = src;
    },

    _fmtSupported: function (fmt) {
      try {
        var el = document.createElement("audio");
        return !!el.canPlayType("audio/" + fmt + ";");
      } catch (e) { return false; }
    },

    play: function (name, opts) {
      opts = opts || {};
      if (!this.enabled || !window.AudioManager || !window.AudioManager.unlocked) return;
      var a = this._pool[name];
      if (!a) return;
      try {
        a.currentTime = 0;
        a.volume = this.volume * (opts.vol || 1);
        a.playbackRate = opts.pitch || 1;
        var p = a.play();
        if (p && p.catch) p.catch(function () {});
      } catch (e) {}
    },

    shoot: function () {
      var pick = Math.random();
      if (pick < 0.75) this.play("shoot-0", { pitch: 0.92 + Math.random() * 0.18 });
      else this.play("shootAlt-0", { pitch: 0.9 + Math.random() * 0.2 });
    },
    enemyShoot: function () { this.play("click-0", { vol: 0.22, pitch: 0.6 }); },
    explosion: function () {
      var pick = Math.random();
      if (pick < 0.55) this.play("explosion-0", { vol: 0.85 });
      else this.play("explosionAlt-0", { vol: 0.8 });
    },
    death: function () { this.play("death-0", { vol: 0.9 }); },
    hit: function () { this.play("hit-0", { vol: 0.5 }); },
    damage: function () { this.play("takingDamage-0", { vol: 0.8 }); },
    powerup: function () { this.play("powerup-0", { pitch: 1.1 }); },
    levelup: function () { this.play("levelup-0", { vol: 0.8 }); },
    bossAlarm: function () { this.play("levelup-0", { vol: 0.7, pitch: 0.7 }); },
    click: function () { this.play("click-0", { vol: 0.6 }); },
    hover: function () { this.play("hover-0", { vol: 0.4 }); },

    resume: function () { this.enabled = true; },
    suspend: function () { this.enabled = false; },
    toggle: function () { this.enabled = !this.enabled; return this.enabled; }
  };

  var AudioManager = {
    unlocked: false,
    unlock: function () {
      if (this.unlocked) return true;
      var ctx = (window.AudioContext || window.webkitAudioContext);
      if (!ctx) return false;
      try {
        var ac = new ctx();
        if (ac.state === "suspended") ac.resume().catch(function () {});
      } catch (e) {}
      this.unlocked = true;
      return true;
    }
  };

  window.SFX = SFX;
  window.AudioManager = AudioManager;
})();
