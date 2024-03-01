
var products = {
    'white': {
        
        'plain': {
            'unit_price': 5.12,
            'photo': 'white.jpg' 
        },
        'printed': {
            'unit_price': 8.95,
            'photo': 'whitePrinted.jpg' 
        }
    },
    
    'colored': {
        'plain': {
            'unit_price': 6.04,
            'photo': 'color.jpg' 
        },
        'printed': {
            'unit_price': 9.47,
            'photo': 'colorPrinted.jpg' 
        }
    }
}


// Search params

var search_params = {
    "quantity": "",
    "color": "",
    "quality": "",
    "style": "",
}


// Additional pricing rules:

// 1. The prices above are for Basic quality (q150). 
// The high quality shirt (190g/m2) has a 12% increase in the unit price.

// 2. Apply the following discounts for higher quantities: 
    // 1: above 1.000 units - 20% discount
    // 2: above 500 units - 12% discount
    // 3: above 100 units - 5% discount


//variables
getQuantity = parseInt($("#quantity").val());
getColor = $(".color.selected").html();
getQuality = $(".quality.selected").html();
getStyle = $("#style").val();

$(function(){

    //add values to object
    function updatePrameter(){
        search_params.quantity = getQuantity;
        search_params.color = getColor;
        search_params.quality = getQuality;
        search_params.style = getStyle;
        setDetails();
    }
    updatePrameter();

    //set values to order details elements
    function setDetails(){
        if(search_params.quality.toLocaleLowerCase() === $("#basic").text()){
            $("#productDetail").html($("#basic").text());
        }else{
            $("#productDetail").html($("#high").text());
        }
        $("#styleDetail").html(search_params.style);
        $("#qualityDetail").html(search_params.quality);
        $("#colorDetail").html(search_params.color);
        $("#quantityDetail").html(search_params.quantity);

        updatePrice();
        updateImage();
    }
    
    //update price
    function updatePrice(){
        var uPrice = products[search_params.color.toLocaleLowerCase()][search_params.style.toLocaleLowerCase()].unit_price;
        
        if( $(".fabricQualityWrapper .quality.selected").attr("id") === "high"){
            uPrice += (uPrice * 0.12);
        }else{
            uPrice = uPrice;
        }

        var totalPrice = uPrice * search_params.quantity;

        if(search_params.quantity >= 1000){
            totalPrice -= (totalPrice * 0.2);
        }else if(search_params.quantity >= 500){
            totalPrice -= (totalPrice * 0.12);
        }else if(search_params.quantity >= 100){
            totalPrice -= (totalPrice * 0.05);
        }else{
            totalPrice = totalPrice;
        }

        $("#total").html(totalPrice.toLocaleString("en-US",{style:"currency", currency:"USD"}));
    }

    //update image
    function updateImage(){
        $(".productImage img").attr("src", "./images/" + products[search_params.color.toLocaleLowerCase()][search_params.style.toLocaleLowerCase()].photo);
    }

    //update quantity on change
    $("#quantity").on("change", ()=>{
        search_params.quantity = parseInt($("#quantity").val());
        setDetails();
    });

    //update color on change
    $("#white").on("click", function () {
        $("#colored").removeClass("selected");
        $("#white").addClass("selected");
        search_params.color = $(".color.selected").html();
        setDetails();
    });

    $("#colored").on("click", function () {
        $("#white").removeClass("selected");
        $("#colored").addClass("selected");
        search_params.color = $(".color.selected").html();
        setDetails();
    });

    //update quality on change
    $("#high").on("click", function () {
        $("#basic").removeClass("selected");
        $("#high").addClass("selected");
        search_params.quality = $(".quality.selected").html();
        setDetails();
    });

    $("#basic").on("click", function () {
        $("#high").removeClass("selected");
        $("#basic").addClass("selected");
        search_params.quality = $(".quality.selected").html();
        setDetails();
    });

    //update style on change
    $("#style").on("change", function (){
        search_params.style = $("#style").val();
        setDetails();
    });

    //thanks message
    $("#completeOrderButton").click(function (){
        alert("Thanks for Purchasing");
    });
});





