/* vk-hook.js — перехват покупок через VK Play.
 * Определяет window.NativeBilling и window.NativeAds,
 * чтобы main.js работал без изменений.
 */
(function () {
  'use strict';

  // === Каталог товаров ===
  // Ключи совпадают с PREMIUM_PRODUCT_ID из main.js ("novaPrime")
  var PRODUCTS = {
    'novaPrime': { id: '1001', amount: 199.00, name: 'NOVA PRIME' },
    'nova_prime': { id: '1001', amount: 199.00, name: 'NOVA PRIME' }
  };

  // =====================================================
  // ADS — VK Play не поддерживает interstitial/rewarded
  // в базовом API. Делаем no-op, чтобы кнопки "Возродиться"
  // не крашились (просто не сработают — вернётся false).
  // =====================================================
  window.NativeAds = {
    ready: true,
    init: function () { return Promise.resolve(); },
    showBanner: function () {},
    hideBanner: function () {},
    prepareInterstitial: function () {},
    showInterstitial: function () { return Promise.resolve(false); },
    prepareRewarded: function () {},
    showRewarded: function (onReward) {
      console.log('[VK IAP] Rewarded ads not available — returning false');
      if (onReward) onReward(false);
      return Promise.resolve();
    }
  };

  // =====================================================
  // IAP — через VK Play paymentFrame
  // =====================================================
  var pendingPurchase = null;
  var pendingTimer = null;
  var TIMEOUT_MS = 180000; // 3 мин — VK Play может обрабатывать долго

  function clearPending(success) {
    if (pendingTimer) { clearTimeout(pendingTimer); pendingTimer = null; }
    if (!pendingPurchase) return;
    var p = pendingPurchase;
    pendingPurchase = null;
    try {
      p.resolve({
        success: !!success,
        productID: success ? p.productId : undefined,
        canceled: !success
      });
    } catch (e) { console.warn('[VK IAP] resolve fail:', e); }
  }

  function startPurchase(productId) {
    return new Promise(function (resolve) {
      var product = PRODUCTS[productId];
      if (!product) {
        console.warn('[VK IAP] Unknown product:', productId);
        resolve({ success: false });
        return;
      }

      if (!window.vkPlayApi || typeof window.vkPlayApi.paymentFrame !== 'function') {
        console.warn('[VK IAP] VK Play API not ready');
        resolve({ success: false, canceled: true });
        return;
      }

      if (pendingPurchase) {
        try { pendingPurchase.resolve({ success: false, canceled: true }); } catch (e) {}
        if (pendingTimer) { clearTimeout(pendingTimer); pendingTimer = null; }
      }

      pendingPurchase = { productId: productId, resolve: resolve };

      try {
        window.vkPlayApi.paymentFrame({
          merchant_param: {
            uid: (window.vkPlayUser && window.vkPlayUser.uid) || 'guest',
            amount: product.amount.toFixed(2),
            currency: 'RUB',
            description: product.name,
            item_id: product.id
          },
          callback: function (result) {
            console.log('[VK IAP] payment result:', result);
            if (result && (result.success || result.status === 'success')) {
              clearPending(true);
            } else {
              clearPending(false);
            }
          }
        });

        pendingTimer = setTimeout(function () {
          console.log('[VK IAP] timeout after ' + (TIMEOUT_MS/1000) + 's');
          clearPending(false);
        }, TIMEOUT_MS);

        console.log('[VK IAP] paymentFrame opened for', productId);
      } catch (e) {
        console.warn('[VK IAP] paymentFrame error:', e);
        clearPending(false);
      }
    });
  }

  window.NativeBilling = {
    purchase: function (productId) { return startPurchase(productId); },
    getPurchases: function () {
      // VK Play хранит покупки на своей стороне; для MVP — пусто.
      return Promise.resolve([]);
    }
  };

  console.log('[VK] hooks installed (NativeBilling + NativeAds)');
})();
