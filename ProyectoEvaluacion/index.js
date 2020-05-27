$(".tab").click(function () {
    //hide all calculators
    $(".calculator").hide("slow", function () { });
    //show only chosen calculator.
    $(".calculator." + $(this).attr('class').split(/\s+/)[0]).show("slow", function () { });
});

var rowPayback = `
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
    
    var row_type="";
    if (elementType == "payback")
        row_type = rowPayback;
    else if (elementType == "NPV")
        row_type = rowNPV;
    else if (elementType == "depreciation")
        row_type = rowdepreciation;

    if (rows[elementType] == undefined) {
        rows[elementType] = amount;
        $("." + elementType + "-rows").append(row_type.repeat(amount));
    }
    // alert("HELLO");
    var current = rows[elementType];
    if (current < amount) {
        //need more rows
        $("." + elementType + "-rows").append(row_type.repeat(amount - current));
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

function getNPV(tazaInt, principal, cashFlows) {
    var npv = principal;

    for (var i = 0; i < cashFlows.length; i++) {
        npv += cashFlows[i] / Math.pow(tazaInt / 100 + 1, i + 1);
    }

    return npv;
}

