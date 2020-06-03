$(".tab").click(function () {
    //hide all calculators
    $(".calculator").hide("slow", function () { });
    //show only chosen calculator.
    $(".calculator." + $(this).attr('class').split(/\s+/)[0]).show("slow", function () { });
});

$(".checklist.calculator").load("checklist.html");

var rowPayback = `
<div class="whole_row">
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">$</span>
        </div>
        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" min="0" value="0" required>
        <div class="input-group-append">
            <span class="input-group-text">.00</span>
        </div>
    </div>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">$</span>
        </div>
        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" min="0" value="0" required>
        <div class="input-group-append">
            <span class="input-group-text">.00</span>
        </div>
    </div>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">$</span>
        </div>
        <input readonly type="text" class="form-control" aria-label="Amount (to the nearest dollar)" min="0" value="0" required>
        <div class="input-group-append">
            <span class="input-group-text">.00</span>
        </div>
    </div>
</div>
`;
var rowNPV = `
<div class="whole_row">
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">$</span>
        </div>
        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
        <div class="input-group-append">
            <span class="input-group-text">.00</span>
        </div>
    </div>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">$</span>
        </div>
        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
        <div class="input-group-append">
            <span class="input-group-text">.00</span>
        </div>
    </div>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">$</span>
        </div>
        <input readonly type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
        <div class="input-group-append">
            <span class="input-group-text">.00</span>
        </div>
    </div>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">$</span>
        </div>
        <input readonly type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
        <div class="input-group-append">
            <span class="input-group-text">.00</span>
        </div>
    </div>
</div>
`;
var rowdepreciation = `
<div class="whole_row">
    <div class="input-group mb-3">
        <input readonly type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
        <div class="input-group-append">
            <span class="input-group-text">%</span>
        </div>
    </div>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">$</span>
        </div>
        <input readonly type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
        <div class="input-group-append">
            <span class="input-group-text">.00</span>
        </div>
    </div>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">$</span>
        </div>
        <input readonly type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
        <div class="input-group-append">
            <span class="input-group-text">.00</span>
        </div>
    </div>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">$</span>
        </div>
        <input readonly type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
        <div class="input-group-append">
            <span class="input-group-text">.00</span>
        </div>
    </div>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">$</span>
        </div>
        <input readonly type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
    </div>
</div>
`;

var rows = {};

$(".periodsInput").change(function () {
    var parentType = findParentType($(this));
    if (document.getElementById("Periodo" + parentType).checkValidity())
        changeRows(parentType, $(this).val());
});

function findParentType(element) {
    return element.parent().parent().parent().attr('class').split(/\s+/)[0];
}

function changeRows(elementType, amount) {

    var row_type = "";
    if (elementType == "payback")
        row_type = rowPayback;
    else if (elementType == "NPV")
        row_type = rowNPV;
    else if (elementType == "depreciation")
        row_type = rowdepreciation;

    if (rows[elementType] == undefined) {
        rows[elementType] = amount;
        $("." + elementType + "-rows").append(row_type.repeat(amount));
        $.each($("." + elementType + "-rows>.whole_row"),function( i, val ) {
            $(val).append("<h2>"+i+"</h2>");
        });

    }
    // alert("HELLO");
    var current = rows[elementType];
    if (current < amount) {
        //need more rows
        
        $.each($("." + elementType + "-rows>.whole_row"),function( i, val ) {
            $(val).children().last().remove()
        });
        $("." + elementType + "-rows").append(row_type.repeat(amount - current));
        $.each($("." + elementType + "-rows>.whole_row"),function( i, val ) {
            $(val).append("<h2>"+i+"</h2>");
        });
        

        // alert("Row increased");
        rows[elementType] = amount;
    } else if (current > amount) {
        //need fewer rows
        for (let index = 0; index < current - amount; index++) {
            $("." + elementType + "-rows").children().last().remove();
        }
        // alert("Row decreased");
        rows[elementType] = amount;
    }

    // console.log(rows);
}

function getPayback(tazaInt, principal, cashflows) {
    var i = 0;
    for (; i < cashflows.length && principal > 0; i++) {
        const element = cashflows[i];
        principal -= element;
    }
    return i - 1; // I think
}

function clearRows(element) {
    // alert(findParentType($(this)));
    $("." + findParentType($(element)) + "-rows>div>input").val('');
}

function getNPV(tazaInt, i, cashFlow, tax) {
    return (cashFlow * (1 - tax)) / Math.pow(tazaInt + 1, i + 1);
}

function calculateNPV() {
    var principal = - $("#PrincipalNPV").val();
    var tax = $("#ImpuestoNPV").val() / 100;
    var tazaInt = $("#TazaNPV").val();
    var inflacion = $("#InflacionNPV").val();

    var tazaIntf = tazaInt / 100 + inflacion / 100 + ((tazaInt / 100) * (inflacion / 100));

    console.log("Principal: " + principal + ", tazaf: " + tazaIntf);


    $(".NPV-rows>.whole_row").each(function (i, element) {
        var inputs = $(element).children("div").children("input");
        var outflow = inputs.eq(0).val();
        var inflow = inputs.eq(1).val();
        var total_flow = (inflow - outflow)

        var pv = getNPV(tazaIntf, i, total_flow, tax);
        inputs.eq(2).val("" + (inflow - outflow));
        inputs.eq(3).val("" + pv);

        principal = principal + pv;
        console.log("inflow: " + inflow + ", outflow: " + outflow + ", total: " + total_flow + ", pv: " + pv + ", principal: " + principal);
        // inputs.eq(2).value(inflow-outflow);

        // console.log($(element).children("div").children("input").eq(1).val());
    });

    $("#resultNPV").val("" + principal);
}

function calculatePayback() {
    //get principal, tax
    var principal = $("#PrincipalPayback").val();
    var tax = $("#TazaPayback").val();
    var found = false;
    $(".payback-rows>.whole_row").each(function (i, element) {
        var inputs = $(element).children("div").children("input");
        var outflow = inputs.eq(0).val();
        var inflow = inputs.eq(1).val();
        var total_flow = (inflow - outflow) / Math.pow(1 + (tax / 100), i + 1);
        principal -= total_flow;
        if (-principal >= 0 && !found) {
            alert((i + 1) + " is first break even period");
            found = true;
        }
        console.log(inputs.eq(2).val("" + -principal));

        // inputs.eq(2).value(inflow-outflow);
        // console.log($(element).children("div").children("input").eq(1).val());
    });
    // console.log($(".payback-rows>.whole_row>div>input").eq(0).val());
}

function calculateStraight() {
    var principal = $("#Principaldepreciation").val();
    var tax = $("#Impuestodepreciation").val();
    var salvage = $("#salvagedepreciation").val();
    var periods = $("#Periododepreciation").val();

    dep = (principal - salvage) / periods;
    dep_rate = 100 * (dep / principal)
    total_dep = 0;
    console.log(dep);
    

    $(".depreciation-rows>.whole_row").each(function (i, element) {
        var inputs = $(element).children("div").children("input");
        total_dep += dep;
        // var outflow = inputs.eq(0).val();
        // var inflow = inputs.eq(1).val();
        inputs.eq(0).val("" + dep_rate);
        inputs.eq(1).val("" + dep*principal);
        inputs.eq(2).val("" + total_dep);
        inputs.eq(3).val("" + principal-total_dep);
        inputs.eq(4).val("" + (principal-total_dep)*(tax/100));
        // var total_flow = (inflow - outflow) / Math.pow(1 + (tax / 100), i + 1);

        // console.log(inputs.eq(2).val("" + -principal));

    });
}

function openExcel() {
    window.open("test.xlsx");
} 

function calculateMACRS() {
    var principal = $("#Principaldepreciation").val();
    var tax = $("#Impuestodepreciation").val();
    var salvage = $("#salvagedepreciation").val();
    var periods = $("#Periododepreciation").val();
    var option = $("#sel1").val();
    // console.log(option);

    $("#Periododepreciation").val(""+(option+1));
    changeRows("depreciation",option+1);
    var cats= {
        3:[33.33, 44.45, 14.81, 7.41],
        5:[20, 32, 19.20, 11.52, 11.52, 5.76],
        7:[14.29, 24.49, 17.49, 12.49, 8.93, 8.92, 8.93, 4.46],
        10:[10, 18, 14.4, 11.52, 9.22, 7.37, 6.55, 6.55, 6.56, 6.55, 3.28]
    };
    deps = cats[""+option];
    // console.log(deps);

    // for
    
}