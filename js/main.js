// js、jQueryを記述する際はここに記載していく
//　コメントに@paramなど書く、＋を書くとテキストが数値に、promiseというオブジェクト、リクエストアニメーションフレーム

/* PLAN
---------------------------- */
let memoOrder = 0;

const memoItems = document.querySelectorAll(".memo-select");

for (let memoOrder = 0; memoOrder < memoItems.length; memoOrder++) {
  const keyframes = {
    opacity: [0, 1],
  };
  const options = {
    duration: 1200,
    delay: memoOrder * 400,
    fill: "forwards",
  };
  memoItems[memoOrder].animate(keyframes, options);
}

/* 配列考え中
let memofill = 0;

const memoItem = document.querySelectorAll('textarea[name="text-all"]');
console.log(memoItem);

const memoItem = document.querySelectorAll(".text-all");
console.log(memoItem);

const memo = memoItem[memofill].val();
console.log(memo);

*/

$(".save").on("click", function () {
  const memo01 = $(".text01").val();
  const memo02 = $(".text02").val();
  const memo03 = $(".text03").val();
  localStorage.setItem("memo01", memo01);
  localStorage.setItem("memo02", memo02);
  localStorage.setItem("memo03", memo03);
});

$(".delete").on("click", function () {
  localStorage.removeItem("memo01");
  localStorage.removeItem("memo02");
  localStorage.removeItem("memo03");
  $(".text01").val("");
  $(".text02").val("");
  $(".text03").val("");
});

if (localStorage.getItem("memo01")) {
  const memo01 = localStorage.getItem("memo01");
  $(".text01").val(memo01);
}
if (localStorage.getItem("memo02")) {
  const memo02 = localStorage.getItem("memo02");
  $(".text02").val(memo02);
}
if (localStorage.getItem("memo03")) {
  const memo03 = localStorage.getItem("memo03");
  $(".text03").val(memo03);
}

const qs = [
  "首都圏に住むozmallユーザーのうち、一人旅経験者の割合は？",
  "首都圏に住むozmallユーザーのうち、一人旅をしたいと思ったきっかけの１位は？",
  "首都圏に住むozmallユーザーのうち、一人旅で不安なことの１位は？",
  "トラベルズーの調査による、一人旅の懸念点の１位は？",
  "トラベルズーの調査による、一人旅の目的の２位は？（１位は寺社仏閣・世界遺産巡り）",
  "トラベルズーの調査による、一人旅で利用した宿泊施設１位は？",
];
const toi = [
  ["30〜39％", "40〜49％", "50〜59％", "60〜69％"],
  ["旅先の魅力", "自分へのご褒美に贅沢", "一人の時間が欲しい", "リフレッシュ"],
  ["一人での食事", "治安", "時間の潰し方", "宿泊施設の居心地"],
  [
    "話し相手がいないのはつまらない",
    "一人旅の楽しみがわからない",
    "料金が高い",
    "安全防犯面に不安",
  ],
  ["一人の時間を確保するため", "博物館・美術館巡り", "グルメ", "温泉"],
  ["シティホテル・ビジネスホテル", "リゾートホテル", "旅館", "ゲストハウス"],
];
const ans = [3, 4, 2, 1, 4, 1];

let i = 0;
function q(qsNumber) {
  $(".qs-number").html("第" + [qsNumber + 1] + "問");
  $(".quest").html(qs[qsNumber]);
  $(".toi01").html(toi[qsNumber][0]);
  $(".toi02").html(toi[qsNumber][1]);
  $(".toi03").html(toi[qsNumber][2]);
  $(".toi04").html(toi[qsNumber][3]);
}
q(i);
console.log(i, "第1問回答前の数値、画面表示されているのは第1問");
$("[name=toi]").on("click", function () {
  console.log(qs.length, "全設問数");
  if ($(this).val() == ans[i]) {
    alert("あたり");
  } else {
    alert("はずれ");
  }
  // 第6問目回答後はやらない処理、iは0からなのでi=5はやらない
  if (i < qs.length - 1) {
    i++;
    q(i);
    console.log(i, "第N問回答後、画面表示されているのは第N+1問");
  }
});

function mapsInit(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  $(".map").html("緯度" + lat + "，" + "経度" + lon);
}

function mapsError(error) {
  let e = "";
  if (error.code == 1) {
    e = "位置情報が許可されていません";
  }
  if (error.code == 2) {
    e = "現在位置を特定できません";
  }
  if (error.code == 1) {
    e = "位置情報を取得する前にタイムアウトになりました";
  }
  alert("エラー：" + e);
}

const set = { enableHighAccuracy: true, maximumAge: 20000, timeout: 10000 };

/* ひとまずコメントアウト中
navigator.geolocation.getCurrentPosition(mapsInit, mapsError, set);
*/

/* GAME（今日は誰と勝負する？）
---------------------------- */
/* コニーちゃんとの最高戦歴を最下部に表示させる */
if (localStorage.getItem("result01")) {
  let result01 = localStorage.getItem("result01");
  $(".result01").html(result01);
  console.log(result01, "最高勝率");
} else {
  localStorage.setItem("result01", 0);
}

$(".game-img01").on("click", function () {
  /* 対戦相手を選択後に対戦相手の選択画面を非表示にし、戦績初期値としてを0を定義する */
  $(".chara-container").hide(1000);
  let match = 0;
  let win = 0;
  let lose = 0;
  let draw = 0;

  /* 対戦相手を選択後に対戦相手名を表示させる */
  let select;
  select = $(this).attr("id");
  console.log(select, "キャラクター");
  if (select === "s01") {
    $(".chara-set").html("対戦相手はコニーちゃんだよ");
  } else if (select === "s02") {
    $(".chara-set").html("対戦相手はサザエさんだよ");
  } else if (select === "s03") {
    $(".chara-set").html("対戦相手はドラえもんだよ");
  } else if (select === "s04") {
    $(".chara-set").html("対戦相手はバルタン星人だよ");
  } else if (select === "s05") {
    $(".chara-set").html("対戦相手はセーラーマーキュリーだよ");
  }

  /* 対戦相手のyoutube表示中に動画下部に表示する文字に適用するhtmlとcss */
  function gameSet0201() {
    $(".game-set02").html("対戦相手は何を出すかな？");
    $(".game-set02").css("color", "#000000");
    $(".game-set02").css("font-size", "100%");
    $(".game-set02").css("font-weight", "normal");
  }

  /* 対戦相手のyoutube終了後に動画下部に表示する文字に適用するcss */
  function gameset0202() {
    match++;
    console.log(match, "今回の対戦数");
    $(".game-set02").css("color", "#ff00ff");
    $(".game-set02").css("font-size", "130%");
    $(".game-set02").css("font-weight", "bold");
    $(".game-set02").addClass("is-active").dequeue();
  }

  /* 対戦結果を下部に表示させる */
  function resultAll() {
    let result = "あなたの対戦結果　" + win + "勝" + lose + "負" + draw + "分";
    console.log(result);
    $(".result").html(result);
    $(".result").css("color", "#800000");
    $(".result").css("font-size", "130%");
    $(".result").css("font-weight", "bold");
    $(".result").addClass("is-active").dequeue();
  }

  if (select === "s01") {
    $(".hand-select").on("click", function () {
      $(".result-connie").show();
      let item;
      item = $(this).attr("id");
      console.log(item, "自分の手");
      if (item === "i01") {
        $(".item-set").html("あなたはグーだね");
      } else if (item === "i02") {
        $(".item-set").html("あなたはチョキだね");
      } else if (item === "i03") {
        $(".item-set").html("あなたはパーだね");
      }
      let random = Math.floor(Math.random() * 3 + 1);
      console.log(random, "ランダムな数字の箱");
      if (select === "s01" && random === 1) {
        console.log("コニーちゃんグー");
        $(".game-set01").html(
          `<iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/q5pmq3SkBR4?start=17&end=32&autoplay=1&mute=1&playsinline=1"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>`
        );
        gameSet0201();
        $(".game-set02")
          .delay(12000)
          .queue(function () {
            if (select === "s01" && random === 1 && item === "i01") {
              draw++;
              $(".game-set02").html(
                "コニーちゃんはグー<br>あなたもグーだからコニーちゃんとあいこだよ"
              );
            } else if (select === "s01" && random === 1 && item === "i02") {
              lose++;
              $(".game-set02").html(
                "コニーちゃんはグー<br>あなたはチョキだからあなたの負けだよ"
              );
            } else if (select === "s01" && random === 1 && item === "i03") {
              win++;
              $(".game-set02").html(
                "コニーちゃんはグー<br>あなたはパーだからあなたの勝ちだよ"
              );
            }
            gameset0202();
          });
      } else if (select === "s01" && random === 2) {
        console.log("コニーちゃんチョキ");
        $(".game-set01").html(
          `<iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/q5pmq3SkBR4?end=15&autoplay=1&mute=1&playsinline=1"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>`
        );
        gameSet0201();
        $(".game-set02")
          .delay(12000)
          .queue(function () {
            if (select === "s01" && random === 2 && item === "i01") {
              win++;
              $(".game-set02").html(
                "コニーちゃんはチョキ<br>あなたはグーだからあなたの勝ちだよ"
              );
            } else if (select === "s01" && random === 2 && item === "i02") {
              draw++;
              $(".game-set02").html(
                "コニーちゃんはチョキ<br>あなたもチョキだからコニーちゃんとあいこだよ"
              );
            } else if (select === "s01" && random === 2 && item === "i03") {
              lose++;
              $(".game-set02").html(
                "コニーちゃんはチョキ<br>あなたはパーだからあなたの負けだよ"
              );
            }
            gameset0202();
          });
      } else if (select === "s01" && random === 3) {
        console.log("コニーちゃんパー");
        $(".game-set01").html(
          `<iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/q5pmq3SkBR4?start=34&autoplay=1&mute=1&playsinline=1"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>`
        );
        gameSet0201();
        $(".game-set02")
          .delay(12000)
          .queue(function () {
            if (select === "s01" && random === 3 && item === "i01") {
              lose++;
              $(".game-set02").html(
                "コニーちゃんはパー<br>あなたはグーだからあなたの負けだよ"
              );
            } else if (select === "s01" && random === 3 && item === "i02") {
              win++;
              $(".game-set02").html(
                "コニーちゃんはパー<br>あなたはチョキだからあなたの勝ちだよ"
              );
            } else if (select === "s01" && random === 3 && item === "i03") {
              draw++;
              $(".game-set02").html(
                "コニーちゃんはパー<br>あなたはパーだからコニーちゃんとあいこだよ"
              );
            }
            gameset0202();
          });
      }
      $(".result")
        .delay(13000)
        .queue(function () {
          resultAll();
          let resultConnie = Math.round((win / match) * 100);
          console.log(resultConnie, "勝率");
          if (match >= 5) {
            let result01 = localStorage.getItem("result01");
            if (result01 <= resultConnie) {
              $(".result01")
                .delay(1000)
                .queue(function () {
                  localStorage.setItem("result01", resultConnie);
                  $(".result01").html(resultConnie);
                  $(".result01").css("color", "#800000");
                  $(".result01").css("font-size", "130%");
                  $(".result01").css("font-weight", "bold");
                  $(".result01").addClass("is-active").dequeue();
                });
            }
          }
        });
    });
  } else if (select === "s02") {
    $(".hand-select").on("click", function () {
      let item;
      item = $(this).attr("id");
      console.log(item, "自分の手");
      if (item === "i01") {
        $(".item-set").html("あなたはグーだね");
      } else if (item === "i02") {
        $(".item-set").html("あなたはチョキだね");
      } else if (item === "i03") {
        $(".item-set").html("あなたはパーだね");
      }

      if (select === "s02" && item === "i02") {
        console.log("サザエさんグー");
        lose++;
        $(".game-set01").html(
          `<iframe
        width="560"
        height="315" 
        src="https://www.youtube.com/embed/xBXynSsz_bM?autoplay=1&mute=1&playsinline=1"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        ></iframe>`
        );
        gameSet0201();
        $(".game-set02")
          .delay(5000)
          .queue(function () {
            $(".game-set02").html(
              "サザエさんはグー<br>あなたはチョキだからあなたの負けだよ"
            );
            gameset0202();
          });
      } else if (select === "s02" && item === "i03") {
        console.log("サザエさんチョキ");
        lose++;
        $(".game-set01").html(
          `<iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/MIGgLcW4LMw?start=23&autoplay=1&mute=1&playsinline=1" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen
        ></iframe>`
        );
        gameSet0201();
        $(".game-set02")
          .delay(6000)
          .queue(function () {
            $(".game-set02").html(
              "サザエさんはチョキ<br>あなたはパーだからあなたの負けだよ"
            );
            gameset0202();
          });
      } else if (select === "s02" && item === "i01") {
        console.log("サザエさんパー");
        lose++;
        $(".game-set01").html(
          `<iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/8DYYCnzw0ms?start=23&autoplay=1&mute=1&playsinline=1"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        ></iframe>`
        );
        gameSet0201();
        $(".game-set02")
          .delay(6000)
          .queue(function () {
            $(".game-set02").html(
              "サザエさんはパー<br>あなたはグーだからあなたの負けだよ"
            );
            gameset0202();
          });
      }
      $(".result")
        .delay(7000)
        .queue(function () {
          resultAll();
        });
    });
  } else if (select === "s03") {
    $(".hand-select").on("click", function () {
      let item;
      item = $(this).attr("id");
      console.log(item, "自分の手");
      if (item === "i01") {
        $(".item-set").html("あなたはグーだね");
      } else if (item === "i02") {
        $(".item-set").html("あなたはチョキだね");
      } else if (item === "i03") {
        $(".item-set").html("あなたはパーだね");
      }
      $(".game-set01").html(
        `<iframe width="560"
        height="315"
        src="https://www.youtube.com/embed/AvZoMJrFqeU?end=11&autoplay=1&mute=1&playsinline=1"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        ></iframe>`
      );
      gameSet0201();
      $(".game-set02")
        .delay(11000)
        .queue(function () {
          if (select === "s03" && item === "i01") {
            draw++;
            $(".game-set02").html(
              "ドラえもんはグー<br>あなたはグーだからドラえもんとあいこだよ"
            );
          } else if (select === "s03" && item === "i02") {
            lose++;
            $(".game-set02").html(
              "ドラえもんはグー<br>あなたはチョキだからあなたの負けだよ"
            );
          } else if (select === "s03" && item === "i03") {
            win++;
            $(".game-set02").html(
              "ドラえもんはグー<br>あなたはパーだからあなたの勝ちだよ"
            );
          }
          gameset0202();
        });
      $(".result")
        .delay(12000)
        .queue(function () {
          resultAll();
        });
    });
  } else if (select === "s04") {
    $(".hand-select").on("click", function () {
      let item;
      item = $(this).attr("id");
      console.log(item, "自分の手");
      if (item === "i01") {
        $(".item-set").html("あなたはグーだね");
      } else if (item === "i02") {
        $(".item-set").html("あなたはチョキだね");
      } else if (item === "i03") {
        $(".item-set").html("あなたはパーだね");
      }
      $(".game-set01").html(
        `<iframe width="560"
        height="315"
        src="https://www.youtube.com/embed/zCzitW8RZ90?start=252&end=255&autoplay=1&mute=1&playsinline=1"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        ></iframe>`
      );
      gameSet0201();
      $(".game-set02")
        .delay(4000)
        .queue(function () {
          if (select === "s04" && item === "i01") {
            win++;
            $(".game-set02").html(
              "バルタン星人はチョキ<br>あなたはグーだからあなたの勝ちだよ"
            );
          } else if (select === "s04" && item === "i02") {
            draw++;
            $(".game-set02").html(
              "バルタン星人はチョキ<br>あなたはチョキだからバルタン星人とあいこだよ"
            );
          } else if (select === "s04" && item === "i03") {
            lose++;
            $(".game-set02").html(
              "バルタン星人はチョキ<br>あなたはパーだからあなたの負けだよ"
            );
          }
          gameset0202();
        });
      $(".result")
        .delay(5000)
        .queue(function () {
          resultAll();
        });
    });
  } else if (select === "s05") {
    $(".hand-select").on("click", function () {
      let item;
      item = $(this).attr("id");
      console.log(item, "自分の手");
      if (item === "i01") {
        $(".item-set").html("あなたはグーだね");
      } else if (item === "i02") {
        $(".item-set").html("あなたはチョキだね");
      } else if (item === "i03") {
        $(".item-set").html("あなたはパーだね");
      }
      $(".game-set01").html(
        `<iframe width="560"
        height="315"
        src="https://www.youtube.com/embed/Z1T5h285S34?start=9&autoplay=1&mute=1&playsinline=1"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        ></iframe>`
      );
      gameSet0201();
      $(".game-set02")
        .delay(5000)
        .queue(function () {
          if (select === "s05" && item === "i01") {
            lose++;
            $(".game-set02").html(
              "マーキュリーはパー<br>あなたはグーだからあなたの負けだよ"
            );
          } else if (select === "s05" && item === "i02") {
            win++;
            $(".game-set02").html(
              "マーキュリーはパー<br>あなたはチョキだからあなたの勝ちだよ"
            );
          } else if (select === "s05" && item === "i03") {
            draw++;
            $(".game-set02").html(
              "マーキュリーはパー<br>あなたはパーだからマーキュリーとあいこだよ"
            );
          }
          gameset0202();
        });
      $(".result")
        .delay(6000)
        .queue(function () {
          resultAll();
        });
    });
  }
});
