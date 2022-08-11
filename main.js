

/// <reference path="jquery-3.6.0.js" />


$(function () {


    $("#section1").hide();
    $("#section2").hide();
    $("#section3").hide();
    $("#searchElement").hide();


    $("#displayCoins").click(function () {

        $.ajax({
            url: "https://api.coingecko.com/api/v3/coins",
            success: coins => (displayCoins(coins)),
            error: err => alert(err)
        });
        $("#section1").show();
        $("#section2").hide();
        $("#section3").hide();
        $("#searchElement").show();

    });

    $("#displayChart").click(function () {
        $("#section1").hide();
        $("#section2").show();
        $("#section3").hide();
        $("#searchElement").hide();
    });
    $("#aboutMe").click(function () {
        $("#section1").hide();
        $("#section2").hide();
        $("#section3").show();
        $("#searchElement").hide();
    });


    let arrayCoin = [];

    function displayCoins(coins) {
        $("#cardContainer").empty();
        for (const coin of coins) {
            const card = `
            <div id="card" style="background-color:light blue;">
            <div id="holdInfo">
            <label class="switch">
            <input style="position:absolute; left: 100px;" type="checkbox">
            <span class="slider round"></span>
            </label>
             <h4> Name: ${coin.name} </h4> <br>
             <h4> Symbol: ${coin.symbol}</h4> <br>
             <img src="${coin.image.small}">      
           
             <button id="${coin.id}" class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
               More Info
             </button>
             </div>
             </div>
             <div class="conteiner" id="${coin.name}"> </div> 
              `;
            $(function () {
                arrayCoin.push(coin.name)
                $("#searchBox").autocomplete({
                    source: arrayCoin
                },
                    {
                        autoFocus: false,
                        delay: 300,
                        minLength: 2,
                    })
            })

            setInterval(() => {
                localStorage.setItem("coins", JSON.stringify(coins))
            }, 2000 * 60)
            loadFromStorage = JSON.parse(localStorage.getItem("coins"))


            $("#cardContainer").append(card)

            let marketPriceEur = `${coin.market_data.current_price.eur}`
            let result = marketPriceEur.slice(0, 8)
            let marketPriceUsd = `${coin.market_data.current_price.usd}`
            let result1 = marketPriceUsd.slice(0, 8)
            let marketPriceIls = `${coin.market_data.current_price.ils}`
            let result2 = marketPriceIls.slice(0, 8)

            $(`#${coin.id}`).click(function () {
             
                localStorage.setItem("coinsInfo", JSON.stringify(coin))
                loadFromStorage = JSON.parse(localStorage.getItem("coinsInfo"))
                setTimeout(() => {
                    localStorage.removeItem("coinsInfo");
                }, 2000 * 60)
                const info = ` 
               <div class="collapse" id="collapseExample"> 
                <div id="coins1" class="card card-col">
                <h3>₪: ${result2}</h3>
                <h3>$: ${result1}</h3>
                <h3>€: ${result} </h3>
                <img style="width: 50px; height: 50px;" src="${coin.image.small}"> 
                <button id="closeInfo" class="btn btn-danger">Close</button>
                </div>  
                </div>
                `
                $(`#${coin.name}`).append(info)
                $("#closeInfo").click(() => {
                    $(`#${coin.name}`).empty()
                })
            })
        }
    }

    $("#search-Button").click(function () {

        let loadFromStorage = JSON.parse(localStorage.getItem("coins"))
        console.log(loadFromStorage);
        let searchValue = $("#searchBox").val();

        if (searchValue == '') {
            alert("enter coin")
        }
        else {
            $("#singelCoin").empty();

            for (let i = 0; i < loadFromStorage.length; i++) {
                if (searchValue == loadFromStorage[i].name) {
                    console.log(loadFromStorage[i].name);
                    $("#singelCoin").empty();
                    const displayCard = `
                <div id="card1">
                <label class="switch">
                <input style="position:absolute; left: 100px;" type="checkbox">
                <span class="slider round"></span><
                </label>
                <button class="btn btn-danger" id="removeCoin">Exit</button>
                 <h4> Name:${loadFromStorage[i].name} </h4> <br>
                 <h4> Symbol:  ${loadFromStorage[i].symbol}</h4> <br>
                 <img src="${loadFromStorage[i].image.small}">
                 <button  class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                 More Info
                 </button>
                 <div id="holdsSerch" />
                 </div>
                `
                    $("#singelCoin").append(displayCard)
                }

            }
        }
        $("#removeCoin").click(function () {
            $("#singelCoin").empty();
        })

    })
    let arr = []
    $("#cardContainer").on(".card > input", function (event) {
        let count = 0;

        $(':input').each(function () {
            if (this.checked) {
           
                count++;

            }

        });
        if (count > 5) {
            event.target.checked = false
            alert("You can't select more than 5 coins")
        }
    });
})











