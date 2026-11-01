/* vk-play-api.js — обёртка над VK Play iframe API (mailru.core.js).
 * При запуске в iframe VK Play — инициализирует window.vkPlayApi.
 * При локальном тестировании (не в iframe) — mock для отладки.
 */
(function () {
  'use strict';

  // GMRID из кабинета VK Play (vkplay.ru/developer)
  var GMRID = '51212';

  window.vkPlayUser = null;
  window.vkPlayReady = false;

  // Проверка: мы внутри iframe VK Play И mailru.core.js загружен?
  var isInIframe = (window.self !== window.top);
  var hasIframeApi = (typeof window.iframeApi === 'function');

  if (!isInIframe || !hasIframeApi) {
    console.log('[VK Play] Not in VK Play iframe — standalone mock mode');
    window.vkPlayApi = {
      paymentFrame: function (opts) {
        console.log('[VK Play mock] paymentFrame called:', opts);
        setTimeout(function () {
          if (opts && typeof opts.callback === 'function') {
            opts.callback({ success: false, reason: 'standalone_mode' });
          }
        }, 300);
      },
      authUser: function () { return Promise.resolve(null); },
      getUserInfo: function () { return Promise.resolve(null); }
    };
    window.vkPlayReady = true;
    return;
  }

  var callbacks = {
    appid: GMRID,
    getLoginStatusCallback: function (status) {
      console.log('[VK Play] login status:', status);
      if (status && (status.loggedIn || status.auth)) {
        window.vkPlayUser = status.user || { uid: status.uid || 'vk_user' };
        console.log('[VK Play] user:', window.vkPlayUser);
      }
    },
    paymentReceivedCallback: function (data) {
      console.log('[VK Play] paymentReceived:', data);
    },
    errorCallback: function (err) {
      console.warn('[VK Play] error:', err);
    }
  };

  try {
    iframeApi(callbacks).then(function (api) {
      window.vkPlayApi = api;
      window.vkPlayReady = true;
      console.log('[VK Play] API ready');
      if (typeof api.authUser === 'function') {
        try { api.authUser(); } catch (e) {}
      }
    }).catch(function (err) {
      console.warn('[VK Play] API init failed, using mock:', err);
      window.vkPlayApi = {
        paymentFrame: function (opts) {
          if (opts && typeof opts.callback === 'function') {
            opts.callback({ success: false, reason: 'init_failed' });
          }
        }
      };
      window.vkPlayReady = true;
    });
  } catch (e) {
    console.warn('[VK Play] iframeApi threw, using mock:', e);
    window.vkPlayApi = {
      paymentFrame: function (opts) {
        if (opts && typeof opts.callback === 'function') {
          opts.callback({ success: false, reason: 'api_crash' });
        }
      }
    };
    window.vkPlayReady = true;
  }
})();
