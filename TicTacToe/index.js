let xo;
let counter = 0;
let sel = [];

$("button:first").click(function () {
    xo = 2;
    $("button").toggle("slow");
});
$("button:last").click(function () {
    xo = 1;
    playMachine();
    $("button").toggle("fast");
});

$(".element").click(function (e) { 
    e.preventDefault();
    if (!xo) {
        alert("Select X or O");
    }else{
        if (!sel.includes($(this).index())){
            alert(counter)
            if (counter%2) {
                $(this).text("O");
            } else{
                $(this).text("X");
            }
            counter++;
            sel.push($(this).index());
            console.log(sel);
            
            playMachine();
        }
    }
});

function playMachine() {
    let numb = Math.round(Math.random() * 9 );
    
    if (sel.includes(numb)-1){
        playMachine();
    } else{
        console.log(sel.includes(numb)-1,numb);
        // $(".element:nth-child("+numb+")").text("O");
        // sel.push(numb-1);
        // console.log(sel);        
        // counter++;
    }
}