// 模拟宝藏地图API
class TreasureMap {
  static getInitialClue() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("在古老的图书馆里找到了第一个线索...");
      }, 1000);
    });
  }

  static decodeAncientScript(clue) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!clue) {
          reject("没有线索可以解码!");
        }
        resolve("解码成功!宝藏在一座古老的神庙中...");
      }, 1500);
    });
  }

  static searchTemple(location) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.3) {
          reject("糟糕!遇到了神庙守卫!");
        }
        resolve("找到了一个神秘的箱子...");
      }, 2000);
    });
  }

  static openTreasureBox() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("恭喜!你找到了传说中的宝藏!");
      }, 1000);
    });
  }

  static unlockAncientMechanism(box) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mechanismSolved = Math.random() > 0.3; // 70% 的概率解开机关
        if (!mechanismSolved) {
          reject("机关太复杂了，无法解开...");
        }
        resolve("机关成功解开，宝藏箱可以打开了！");
      }, 1500);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button');
  const messagesDiv = document.getElementById('messages');
  const pages = {
    start: document.getElementById('start-page'),
    library: document.getElementById('library-page'),
    treasureMap: document.getElementById('treasure-map-page'),
    chest: document.getElementById('chest-page'),
    guard: document.getElementById('guard-page'),
    end: document.getElementById('end-page'),
    fail: document.getElementById('fail-page')
  };

  function showPage(pageId) {
    Object.values(pages).forEach(page => page.classList.remove('active'));
    pages[pageId].classList.add('active');
  }

  async function findTreasureWithAsyncAwait() {
    startButton.disabled = true;
    messagesDiv.innerHTML = ''; // 清空之前的消息
    showPage('start');
    try {
      const clue = await TreasureMap.getInitialClue();
      messagesDiv.innerHTML += `<p>${clue}</p>`;
      showPage('library');

      const location = await TreasureMap.decodeAncientScript(clue);
      messagesDiv.innerHTML += `<p>${location}</p>`;
      showPage('treasureMap');

      const box = await TreasureMap.searchTemple(location);
      messagesDiv.innerHTML += `<p>${box}</p>`;
      showPage('chest');

      const mechanismUnlocked = await TreasureMap.unlockAncientMechanism(box);
      messagesDiv.innerHTML += `<p>${mechanismUnlocked}</p>`;
      showPage('chest'); // Mechanism unlocked, but still on chest page

      const treasure = await TreasureMap.openTreasureBox();
      messagesDiv.innerHTML += `<p>${treasure}</p>`;
      showPage('end');
    } catch (error) {
      messagesDiv.innerHTML += `<p class="error">任务失败: ${error}</p>`;
      showPage('fail');
    } finally {
      startButton.disabled = false;
    }
  }

  startButton.addEventListener('click', findTreasureWithAsyncAwait);
});
