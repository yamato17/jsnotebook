
// Run（実行）ボタンへのイベントを付加するメソッド
var setRun2 = ( div, element ) => {
    div.addEventListener('click', function() {
        var program = element.innerHTML;
//console.log( program ); // デバッグ用
        var script = document.createElement('script');
        script.innerHTML = program
            .replace( /<br>/g, "\r\n" )
            .replace( /&nbsp;/,"");
        document.body.appendChild( script );
    });
};

// Run（実行）ボタンへのイベントを付加するメソッド
var setRun = ( div, element ) => {
    div.addEventListener('click', function() {
        var program = element.innerHTML;
//console.log( program ); // デバッグ用
        var script = program
            .replace( /<br>/g, "\r\n" )
          .replace( /&nbsp;/,"");;
        eval( script );
    });
};

window.addEventListener('load', function() {
    showdown.setFlavor('github');

    // mdタグを拾ってMarkdownへの変換処理をおこなう
    var docs = document.querySelectorAll( 'jsn-md' );
    var conv = new showdown.Converter(  );
    docs.forEach( function( value ) {
        value.innerHTML = conv.makeHtml( value.innerHTML );
        var div = document.createElement('button');
    });
    
    // &, >, <を置き換える
    var pres = document.querySelectorAll( 'pre code.javascript' );
    pres.forEach( function( value ) {
        let code = value.innerHTML.replace( /&amp;/g, '&' ).replace( /&lt;/g, '<' ).replace( /&gt;/g, '>' );
        value.innerHTML = code;
    });
    
    // runnableクラスの付いた要素に実行ボタンを付ける
    var pres = document.querySelectorAll( '.runnable' );
    pres.forEach( function( value ) {
        var btn = document.createElement('button');
        btn.textContent = "Run";
        setRun( btn, value );
        btn.contentEditable = false;
        let parent = value.parentNode;
        parent.appendChild( document.createElement('p') );
        parent.appendChild( btn );
        parent.appendChild( document.createElement('pre') );
        parent.style.background = "#f8fcfc";
        parent.style.border = "solid 1px #80a0a0";
    });

    // editableクラスの付いた要素を編集可能にする
    var edit = document.querySelectorAll( '.editable' );
    edit.forEach( function( value ) {
//        value.parentNode.contentEditable = true;
        value.contentEditable = true;
    });

    // hlクラスの付いたタグに色付けを行う
    var code = document.querySelectorAll( 'pre code.hl, pre code.html' );
    code.forEach( function( block ) {
        block.innerHTML = block.innerHTML.replace( /&amp;/g, '&' ); 
        hljs.highlightBlock( block );
    });
});
