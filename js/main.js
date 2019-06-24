class game{
  constructor(level){
    this.level = level; // ゲームレベル
    this.panel;
    this.startTime;
    this.boader = new boader(this.level);
    this.start = document.getElementById('start');
    //スタートボタンイベントリスナー
    start.addEventListener("click", (event) =>{
      // パネル数字のシャッフル処理
      this.boader.shuffle();
      // タイマー停止処理
      clearTimeout(game.sto);
      // スタート時間生成
      this.startTime = new Date();
      // panelインスタンス生成
      this.panel = new panel();
      // カウントダウン実行
      this.tim(this.startTime);
    });

    //数字イベントリスナー
    this.tab = document.getElementById('tab');
    tab.addEventListener("click", (event) =>{
      //メソッド呼び出し
      this.panel.judgment(event);
    });
  }//constructor()
  //カウントダウンメソッド
  tim(s){
    //スタート時間取得
    let startTime = s;
    function cbd(){
      //ミリ秒にする
      let now = (new Date - startTime) / 1000;
      //小数点2位までにする
      now = now.toFixed(2);
      const timCount = document.getElementById('timCount');
      //時間出力
      timCount.textContent = now;
      //10ミリ秒ごとにcbd関数を呼び出す。　
      game.sto = setTimeout(cbd,10);//game.stoよくわかりません。static変数を生成？？？？？？？？？？？？？？？？？？？？？？
    }
    //上の関数呼び出し
    cbd();
  }

}//class game

class boader{
  constructor(level){
    this.hairetu = [];
    const tab = document.getElementById('tab');
    const start = document.getElementById('start');
    //テーブルのtrとtdを作成
    for(let i = 0; i < level; i++){
      const tr = document.createElement('tr');
      for(let j = 0; j < level; j++){
        const td = document.createElement('td');
        let v = i * level + j;
        //idに数字を設定
        td.setAttribute("id",v);
        //数字を出力
        td.textContent = v;
        td.setAttribute("class","back");
        //各tdを配列に代入
        this.hairetu.push(td);

        tr.appendChild(td);
      }
      tab.appendChild(tr);
    }
  }//constructor(level)
  //シャッフル
  shuffle(){
    //シャッフル
    for(let v = 0; v < this.hairetu.length; v++){
      //乱数生成
      let a = Math.floor( Math.random() * this.hairetu.length) ;
      //乱数に対応するtdのid取得
      let b = document.getElementById(a);
      //0～順番にtdのid取得
      let g = document.getElementById(v);
      //classnameを変更してbackgroundを青にする
      g.className="";
      //ここから下3行で番号を入れ替える。
      let c = g.textContent;
      g.textContent = b.textContent;
      b.textContent = c;
    }//for文終わり

  }
}

class panel{
  constructor(){
    //判定のための変数
    this.ok = 0;
  }
  //数値が順番通り押されているか判定
  judgment(event){
    let tar = event.target;
    //画面上表示されている数字を取得
    let no = tar.textContent;
    if(this.ok+"" != no){ //条件１
      return;
    }else{  //条件２
      //順番通り押せている場合classNameを変更してbackgroundをグレーにする
      tar.className = "ok";
      //判定のための数値を1増やす
      this.ok++;
      //青～グレーに変わったclassの数とtd要素の数が一致した場合(全てグレーになった場合)
      if(document.getElementsByClassName( "ok" ).length === document.getElementsByTagName('td').length){
        //タイマー止める
        clearTimeout(game.sto);
      }
    }
  }
}

new game(5);

