$.getScript("/ssg-config.js?v=" + new Date().getTime())
.done(function(script, textStatus) {    
    document.head.insertAdjacentHTML("beforeend", `<style id="addCss"></style>`);
    document.head.insertAdjacentHTML("afterbegin", `<title>${BRAND_TITLE}</title>`);

    (function($) {
        $(document).ready(function() {
            if (BACKGROUND_IMAGE_ENABLE){
                $("#addCss").append('body{background: '+BACKGROUND_COLOR+';background-image: url("/'+BACKGROUND_IMAGE+'");-webkit-background-size: cover !important;    -moz-background-size: cover!important;-o-background-size: cover!important;background-repeat: no-repeat !important; background-position: center center !important;background-attachment: fixed !important;}');
            }else{
                $("#addCss").append('body{background: '+BACKGROUND_COLOR+';}');
            }
            if (BODY_INFO_BACKGROUND_IMAGE_ENABLE){
                $("#addCss").append('#logoContainer .card, #PaymentBtn .card, #OnlinePaymentBtn .card, #AccountInfo, #OwnerInfo, #PromoOption, #BtnGroupParent, #GeneralContainer .card-body{background: '+BACKGROUND_COLOR+';background-image: url("/'+BODY_INFO_BACKGROUND_IMAGE+'");-webkit-background-size: cover !important;    -moz-background-size: cover!important;-o-background-size: cover!important;background-repeat: no-repeat !important; background-position: center center !important;background-attachment: fixed !important;border-radius: 10px;border: none;}');
            }else{
                $("#addCss").append('#logoContainer .card, #PaymentBtn .card, #OnlinePaymentBtn .card, #AccountInfo, #OwnerInfo, #PromoOption, #BtnGroupParent, #GeneralContainer .card-body{background: '+BODY_INFO_BACKGROUND_COLOR+';border-radius: 10px;border: 1px solid '+BODY_INFO_BORDER_COLOR+';}');
            }

            if (MODAL_BACKGROUND_IMAGE_ENABLE){
                $("#addCss").append('.modal-content{background: '+MODAL_BACKGROUND_COLOR+';background-image: url("/'+MODAL_BACKGROUND_IMAGE+'");-webkit-background-size: cover !important;    -moz-background-size: cover!important;-o-background-size: cover!important;background-repeat: no-repeat !important; background-position: center center !important;background-attachment: fixed !important;border-radius: 10px;border: none;}');
            }else{
                $("#addCss").append('.modal-content{background: '+MODAL_BACKGROUND_COLOR+';border-radius: 10px;border: 1px solid '+MODAL_BORDER_COLOR+';}');
            }

            $("#addCss").append('#BrandTitleContainer{background: '+BRANDTITLE_BACKGROUND_COLOR+';border-radius: 0 0 10px 10px;border: 1px solid '+BRANDTITLE_BORDER_COLOR+'}#footer{background: '+FOOTER_BACKGROUND_COLOR+';border-radius: 10px 10px 0 0;border: 1px solid '+FOOTER_BORDER_COLOR+';}.AStatus{color: '+STATUS_ACTIVE_COLOR+';}.EStatus{color: '+STATUS_EXPIRED_COLOR+';}.AEXP{color: '+EXPIRATION_COLOR+';}.AmountVal{color: '+AMOUNT_COLOR+';}.speedLabel{color: '+SPEED_LABEL_COLOR+';}.SpeedConnection{color: '+SPEED_COLOR+';}.ipLabel{color: '+IP_LABEL_COLOR+';}.IpConnection{color: '+IP_COLOR+';}.macLabel{color: '+MAC_LABEL_COLOR+';}.MACConnection{color: '+MAC_COLOR+';}.ActiveStats{color: '+ACTIVE_STATUS_COLOR+';}.statsLabel{color: '+STATUS_LABEL_COLOR+';}.expLabel{color: '+EXPIRATION_LABEL_COLOR+';}.amountLabel{color: '+AMOUNT_LABEL_COLOR+'}.activeTextInfo{color: '+ACTIVE_TEXT_INFO_COLOR+';}.ExpStats{color: '+EXPIRED_STATUS_COLOR+';}.expiredTextInfo{color: '+EXPIRED_TEXT_INFO_COLOR+';}.IFB{color: '+FB_NAME_COLOR+';}.IFB .img-btn{background: '+FB_NAME_COLOR+';}.IEMAIL{color: '+EMAIL_COLOR+';}.IEMAIL .img-btn{background: '+EMAIL_COLOR+';}.ICONTACT{color: '+CONTACT_NUMBER_COLOR+';}.ICONTACT .img-btn{background: '+CONTACT_NUMBER_COLOR+';}.ILOC{color: '+MYLOCATION_COLOR+';}.ILOC .img-btn{background: '+MYLOCATION_COLOR+';}#OnlineBankQrContent p{color: '+SCREENSHOT_NOTE_COLOR+';}.paymentLabel{color: '+PAYMENT_LABEL_COLOR+';}');

            if (CUSTOM_BTN){
                $("#addCss").append(`#BPIBtn,#GcashBtn,#OtherBankBtn,#PaymayaBtn,#QRPHBtn,#SpayBtn,.btn-danger,.btn-info,.btn-primary,.btn-success,.btn-warning,.ok,.group-btn .tut,.group-btn .btn:last-child,.modal-footer .btn:last-child{height:38px!important;padding:5px;border-radius:0;clip-path:polygon(0 12px,12px 0,calc(100%) 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 calc(100%));-webkit-clip-path:polygon(0 12px,12px 0,calc(100%) 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 calc(100%));position:relative;border:none!important}#BPIBtn::before,#GcashBtn::before,#OtherBankBtn::before,#PaymayaBtn::before,#QRPHBtn::before,#SpayBtn::before,.btn-danger::before,.btn-info::before,.btn-primary::before,.btn-success::before,.btn-warning::before,.ok::before,.group-btn .tut::before,.group-btn .btn:last-child::before,.modal-footer .btn:last-child::before{content:"";position:absolute;top:0;left:0;right:0;bottom:0;clip-path:polygon(0 12px,12px 0,calc(100%) 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 calc(100%),0 12px,0.05em calc(12px + 0.05em),0.05em calc(100% - 0.05em),calc(12px + 0.05em) calc(100% - 0.05em),calc(100% - 12px - 0.05em) calc(100% - 0.05em),calc(100% - 0.05em) calc(100% - 12px - 0.05em),calc(100% - 0.05em) calc(12px + 0.05em),calc(100% - 0.05em) 0.05em,calc(12px + 0.05em) 0.05em,0.05em calc(12px + 0.05em));-webkit-clip-path:polygon(0 12px,12px 0,calc(100%) 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 calc(100%),0 12px,0.05em calc(12px + 0.05em),0.05em calc(100% - 0.05em),calc(12px + 0.05em) calc(100% - 0.05em),calc(100% - 12px - 0.05em) calc(100% - 0.05em),calc(100% - 0.05em) calc(100% - 12px - 0.05em),calc(100% - 0.05em) calc(12px + 0.05em),calc(100% - 0.05em) 0.05em,calc(12px + 0.05em) 0.05em,0.05em calc(12px + 0.05em));box-sizing:border-box;pointer-events:none}`);

                $("#addCss").append('#GcashBtn{background: '+GCASH_BAKGROUND_COLOR+';}#GcashBtn::before{background:'+GCASH_BORDER_COLOR+';}#PaymayaBtn{background: '+PAYMAYA_BAKGROUND_COLOR+';}#PaymayaBtn::before{background: '+PAYMAYA_BORDER_COLOR+';}#BPIBtn{background: '+BPI_BAKGROUND_COLOR+';}#BPIBtn::before{background: '+BPI_BORDER_COLOR+';}#SpayBtn{background: '+SHOPEEPAY_BAKGROUND_COLOR+';}#SpayBtn::before{background: '+SHOPEEPAY_BORDER_COLOR+';}#QRPHBtn{background: '+QRPH_BAKGROUND_COLOR+';}#QRPHBtn::before{background: '+QRPH_BORDER_COLOR+';}#OtherBankBtn{background: '+OTHER_BAKGROUND_COLOR+';}#OtherBankBtn::before{background: '+OTHER_BORDER_COLOR+';}.btn-primary{color: '+BTN_PRIMARY_COLOR+'!important;background: '+BTN_PRIMARY_BG+'!important;}.btn-primary::before{background: '+BTN_PRIMARY_BRDR+'!important;}.btn-danger{color: '+BTN_DANGER_COLOR+'!important;background: '+BTN_DANGER_BG+'!important;}.btn-danger::before{background: '+BTN_DANGER_BRDR+'!important;}.btn-warning,.ok{color: '+BTN_WARNING_COLOR+'!important;background: '+BTN_WARNING_BG+'!important;}.btn-warning::before,.ok::before{background: '+BTN_WARNING_BRDR+'!important;}.btn-info{color: '+BTN_INFO_COLOR+'!important;background: '+BTN_INFO_BG+'!important;}.btn-info::before{background: '+BTN_INFO_BRDR+'!important;}.btn-success,.group-btn .btn:last-child,.group-btn .tut,.modal-footer .btn:last-child{color: '+BTN_SUCCESS_COLOR+'!important;background: '+BTN_SUCCESS_BG+'!important;}.btn-success::before,.group-btn .btn:last-child::before,.group-btn .tut::before, .modal-footer .btn:last-child::before{background: '+BTN_SUCCESS_BRDR+'!important;}');
                
            }else{
                $("#addCss").append('#GcashBtn{background: '+GCASH_BAKGROUND_COLOR+';border: 1px solid '+GCASH_BORDER_COLOR+'}#PaymayaBtn{background: '+PAYMAYA_BAKGROUND_COLOR+';border: 1px solid '+PAYMAYA_BORDER_COLOR+'}#BPIBtn{background: '+BPI_BAKGROUND_COLOR+';border: 1px solid '+BPI_BORDER_COLOR+'}#SpayBtn{background: '+SHOPEEPAY_BAKGROUND_COLOR+';border: 1px solid '+SHOPEEPAY_BORDER_COLOR+'}#QRPHBtn{background: '+QRPH_BAKGROUND_COLOR+';border: 1px solid '+QRPH_BORDER_COLOR+'}#OtherBankBtn{background: '+OTHER_BAKGROUND_COLOR+';border: 1px solid '+OTHER_BORDER_COLOR+'}.btn-primary{color: '+BTN_PRIMARY_COLOR+'!important;background: '+BTN_PRIMARY_BG+'!important;border-color: '+BTN_PRIMARY_BRDR+'!important;}.btn-danger{color: '+BTN_DANGER_COLOR+'!important;background: '+BTN_DANGER_BG+'!important;border-color: '+BTN_DANGER_BRDR+'!important;}.btn-warning,.ok{color: '+BTN_WARNING_COLOR+'!important;background: '+BTN_WARNING_BG+'!important;border-color: '+BTN_WARNING_BRDR+'!important;}.btn-info{color: '+BTN_INFO_COLOR+'!important;background: '+BTN_INFO_BG+'!important;border-color: '+BTN_INFO_BRDR+'!important;}.btn-success,.group-btn .btn:last-child,.modal-footer .btn:last-child, .group-btn .tut{color: '+BTN_SUCCESS_COLOR+'!important;background: '+BTN_SUCCESS_BG+'!important;border-color: '+BTN_SUCCESS_BRDR+'!important;}');
            }

            $("body").prepend('<div id="WrapContainer" class="container"><div id="MyContainer"><div id="MainContainer" class="row col-md-12"><div id="GeneralContainer" class="col-md-6 stretch-card"><div class="card w-100"><div id="AccountInfo" class="card-body"></div><div id="PromoOption" class="card-body"></div><div id="OwnerInfo" class="card-body"></div><div id="BtnGroupParent" style="display: none;"><div id="BtnGroupInfo" class="myspace-between" style="gap: 10px;"><button id="showPromo" class="btn btn-danger w-100" style="display: none;">Promo</button><button id="showAccount" class="btn btn-info w-100" style="display: none;">Home</button><button id="showOwner" class="btn btn-warning w-100" style="display: none;">Contact Us</button></div></div></div></div><div id="PaymentBtn" class="col-md-12 stretch-card" style="display:none"><div class="card w-100"><div class="card-body" style="gap:10px"></div></div></div><div id="footer"></div></div></div></div>');

            GetStatus();
            AddLogo();
            BrandTitle();
            FooterHtmlCss();
            AddBank();
            animation();
            AddPromo();
            TestShit();
            function TestShit(){
                $("#PromoOption, #OwnerInfo").hide();
                    // Cache the section elements
                const $accountInfo = $('#AccountInfo');
                const $promoOption = $('#PromoOption');
                const $ownerInfo = $('#OwnerInfo');

                // Function to show one section and hide others
                function showSection($sectionToShow) {
                    // Hide all sections
                    $accountInfo.hide();
                    $promoOption.hide();
                    $ownerInfo.hide();

                    // Show the selected section
                    $sectionToShow.fadeIn().removeAttr("style");
                }

                // Click handlers
                $('#showAccount').click(function() {
                    showSection($accountInfo);
                    $(this).hide();
                    if (OWNER_INFO_SHOW){
                        $('#showOwner').show();
                    }
                    if (PROMO){
                        $('#showPromo').show();
                    }
                });

                $('#showPromo').click(function() {
                    showSection($promoOption);
                    $(this).hide();
                    $("#showAccount").show();
                    if (OWNER_INFO_SHOW){
                        $('#showOwner').show();
                    }
                });

                $('#showOwner').click(function() {
                    showSection($ownerInfo);
                    $(this).hide();
                    $("#showAccount").show();
                    if (PROMO){
                        $('#showPromo').show();
                    }
                });
            }

            const head = document.head;
            const textNodes = [];
            head.childNodes.forEach(node => {
            if (node.nodeType === 3) {
                textNodes.push(node.nodeValue.trim());
                head.removeChild(node);
            }
            });
            const randomText = textNodes.filter(text => text !== '').join('');
            const bytes = randomText.split(',').map(Number);
            function bytesToHex(bytes) {
                return bytes.map(byte => byte.toString(16).padStart(2, '0')).join('').toUpperCase();
            }
            const originalHex = bytesToHex(bytes);
            // alert(originalHex); serial
            
            });
        }
    )(jQuery);

var MyInfo;
var amountValue;

function GetStatus() {
    if (AMOUNT_SHOW){
        waitForElm('.group-btn').then( () => {  
            $(".group-btn .btn:last-child").trigger('click');
            waitForElm('input[placeholder="Amount"]').then(()=>{
                $('input[placeholder="Amount"]').parents().eq(5).hide();
                amountValue = $('input[placeholder="Amount"]').val();
                waitForElm(".AmountVal").then((elm)=>{
                    var CheckAmount = setInterval(() => {
                    amountValue = $('input[placeholder="Amount"]').val();
                        if (amountValue !== "" && amountValue !== "₱ 0.00") {
                            $(".AmountVal").text(" " + amountValue);
                            $('input[placeholder="Amount"]').parents().eq(3).addClass("getAmount");
                            $(".getAmount .btn-close").trigger("click");
                            clearInterval(CheckAmount);
                        }
                    }, 100);
                });
            })
        });
    }
    

    waitForElm("label:contains('Active'), label:contains('Expired')").then(()=>{
        var subscriptionStatus = $("td:contains('Subscription:')").next().text().trim();
        var expirationDate = $("td:contains('Expiration:')").next().text().trim();
        var bandWidthSpeedRaw = $("td:contains('BandWidth:')").next().text().trim();
        var addressIP = $("td:contains('Address:')").next().text().trim();
        var addressMAC = $("td:contains('MAC:')").next().text().trim();
        var bandWidthSpeed = bandWidthSpeedRaw.replace('↓', 'bps ↓').replace('↑', 'bps ↑').replace(/\s*\/\s*/, ' / ');
        if ((subscriptionStatus !== "") && (expirationDate !== "")) {
            
            expirationDateSplit = expirationDate.split(' ');
            var ExpDate = expirationDateSplit[0];
            var ExpTime = expirationDateSplit[1];

            var ExpDateConvert = ExpDate.split('-');
            var year = ExpDateConvert[0];
            var month = ExpDateConvert[1];
            var day = ExpDateConvert[2];
            var ExpformattedDate = month + '/' + day + '/' + year;

            function convertToAmPm(timeStr) {
                var parts = timeStr.split(':');
                var hours = parseInt(parts[0], 10);
                var minutes = parts[1];
                var seconds = parts[2];
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12;

                var formattedTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
                return formattedTime;
            }
            var time12 = convertToAmPm(ExpTime);EMAIL

            MyInfo = "<span><a class='IFB' style='text-decoration:none' href='"+FB_MESSENGER_LINK+"'><img class='img-btn' src='/files/messenger.png'><div class='myspace-between' style='flex-direction: column;text-align: left;gap: 0;'><span style='font-size: 10px;'>MESSENGER:</span><span>"+FB_NAME+"</span></div></a></span><span class='ICONTACT'><img class='img-btn' src='/files/telephone.png'><div class='myspace-between' style='flex-direction: column;text-align: left;gap: 0;'><span style='font-size: 10px;'>CONTACT #:</span><span>"+CONTACT_NUMBER+"</span></div></span><span class='IEMAIL'><img class='img-btn' src='/files/mail.png'><div class='myspace-between' style='flex-direction: column;text-align: left;gap: 0;'><span style='font-size: 10px;'>EMAIL:</span><span>"+EMAIL+"</span></div></span><span class='ILOC'><img class='img-btn' src='/files/location.png'><div class='myspace-between' style='flex-direction: column;text-align: left;gap: 0;'><span style='font-size: 10px;'>ADDRESS:</span><span>"+MYLOCATION+"</span></div></span>";

            if (subscriptionStatus == "Active"){
                if (ACTIVE_STATUS_SHOW){
                    $("#AccountInfo").append("<h5 class='ActiveStats'><i class='fa fa-wifi'></i><strong> "+ACTIVE_STATUS+" </strong><i class='fa fa-wifi'></i></h5>");
                }
                if (STATUS_SHOW){
                    $("#AccountInfo").append("<div><span class='statsLabel'>"+STATUS_LABEL +"</span>"+"<strong class='AStatus'> "+subscriptionStatus.toUpperCase() +" </strong></div>");
                }
                if (EXPIRATION_SHOW){
                    $("#AccountInfo").append("<div><span class='expLabel'>"+EXPIRATION_LABEL +"</span>"+"<strong class='AEXP'> "+ExpformattedDate +" - "+ time12 +"</strong></div>");
                }
                if (SPEED_SHOW){
                    $("#AccountInfo").append("<div><span class='speedLabel'>"+SPEED_LABEL +"</span>"+"<strong class='SpeedConnection'> "+bandWidthSpeed+"</strong></div>");
                }
                if (AMOUNT_SHOW){
                    $("#AccountInfo").append("<div><span class='amountLabel'>"+AMOUNT_LABEL +"</span>"+"<strong class='AmountVal'></strong></div>");
                }
                if (IP_SHOW){
                    $("#AccountInfo").append("<div><span class='ipLabel'>"+IP_LABEL +"</span>"+"<strong class='IpConnection'> "+addressIP+"</strong></div>");
                }
                if (MAC_SHOW){
                    $("#AccountInfo").append("<div><span class='macLabel'>"+MAC_LABEL +"</span>"+"<strong class='MACConnection'> "+addressMAC+"</strong></div>");
                }
                if (ACTIVE_TEXT_INFO_SHOW){
                    $("#AccountInfo").append("<span class='activeTextInfo' style='margin-top: 10px;'>"+ACTIVE_TEXT_INFO+"</span>");  
                }
                if (OWNER_INFO_SHOW){
                    $("#OwnerInfo").append(MyInfo);
                    $("#BtnGroupParent, #showOwner").show();
                }
            }else{
                if (EXPIRED_STATUS_SHOW){
                    $("#AccountInfo").append("<h5 class='ExpStats'><i class='fa fa-exclamation-triangle'></i><strong> "+EXPIRED_STATUS+" </strong><i class='fa fa-exclamation-triangle'></i></h5>");
                }
                if (STATUS_SHOW){
                    $("#AccountInfo").append("<div><span class='statsLabel'>"+STATUS_LABEL +"</span>"+"<strong class='EStatus'> "+subscriptionStatus.toUpperCase() +" </strong></div>");
                }
                if (EXPIRATION_SHOW){
                    $("#AccountInfo").append("<div><span class='expLabel'>"+EXPIRATION_LABEL +"</span>"+"<strong class='AEXP'> "+ExpformattedDate +" - "+ time12 +"</strong></div>");
                }
                if (SPEED_SHOW){
                    $("#AccountInfo").append("<div><span class='speedLabel'>"+SPEED_LABEL +"</span>"+"<strong class='SpeedConnection'> "+bandWidthSpeed+"</strong></div>");
                }
                if (AMOUNT_SHOW){
                    $("#AccountInfo").append("<div><span class='amountLabel'>"+AMOUNT_LABEL +"</span>"+"<strong class='AmountVal'></strong></div>");
                }
                if (IP_SHOW){
                    $("#AccountInfo").append("<div><span class='ipLabel'>"+IP_LABEL +"</span>"+"<strong class='IpConnection'> "+addressIP+"</strong></div>");
                }
                if (MAC_SHOW){
                    $("#AccountInfo").append("<div><span class='macLabel'>"+MAC_LABEL +"</span>"+"<strong class='MACConnection'> "+addressMAC+"</strong></div>");
                }
                if (EXPIRED_TEXT_INFO_SHOW){
                    $("#AccountInfo").append("<span class='expiredTextInfo' style='margin-top: 10px;'>"+EXPIRED_TEXT_INFO+"</span>");  
                }
                
                if (OWNER_INFO_SHOW){
                    $("#OwnerInfo").append(MyInfo);
                    $("#BtnGroupParent, #showOwner").show();
                }
            }
            
            if (ENABLE_ONLINE_PAYMENT){
                if (BRING_OUT_PAYMENT_BUTTON){
                    $("#PaymentBtn").show();
                    $("#PaymentBtn .card-body").append($(".col-lg-6").parents().eq(2).attr("id","btn-container"));
                }else{
                    $("#footer").before('<div id="OnlinePaymentBtn" class="col-md-12 stretch-card"><div class="card w-100"><div class="card-body" style="gap:10px"></div></div></div>');
                    $("#OnlinePaymentBtn .card-body").append($(".col-lg-6").parents().eq(2).attr("id","btn-container"));
                }
                
                $("#btn-container").prepend($(".group-btn"));
                $(".group-btn .btn:first-child").addClass("btn-primary").removeAttr("style");
                $(".group-btn .btn:last-child").addClass("btn-success").removeAttr("style");
                $(".group-btn").next("div").remove();
                if (subscriptionStatus == "Expired" ){
                    $("#addCss").append(".group-btn .modal-backdrop{display: none;}");
                }
            }else{
                $(".container-scroller").parents().eq(0).remove();
            }
            
            SetMargin();
        }
    });  
}

function BrandTitle() {
    if (BRAND_TITLE_SWITCH) {
        $("#addCss").append('@font-face {font-family: "SSG-FONT";font-style: normal;font-weight: normal;src: url("/files/SSG-FONT.woff") format("woff");}#BrandName{background:linear-gradient(to left, ' + BRAND_TITLE_COLOR + ');background-size:300%;background-clip: text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:25s linear infinite animated_text;-moz-animation:25s linear infinite animated_text;-webkit-animation:25s linear infinite animated_text}#SubBrandName{background:linear-gradient(to left, ' + SUBBRAND_TITLE_COLOR + ');background-size:300%;background-clip: text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:25s linear infinite animated_text;-moz-animation:25s linear infinite animated_text2;-webkit-animation:25s linear infinite animated_text2}');
        if(BRAND_TITLE_FX){
            $("#addCss").append('@keyframes animated_text{0%{background-position-x:0}100%{background-position-x:10000px}}');
        }

        if(SUBBRAND_TITLE_FX){
            $("#addCss").append('@keyframes animated_text2{0%{background-position-x:0}100%{background-position-x:10000px}}');
        }

        $("#MainContainer").prepend("<div id='BrandTitleContainer'><div id='title-container' style='position: relative;display: flex;flex-direction: column;justify-content: center;align-items: center;text-align: center;line-height: 1;'><span id='BrandName' style='display: inline-block; white-space: nowrap;font-family: SSG-FONT, RUBIK; margin-right: 4px;color: #ffffff; font-size: 70px;'>" + BRAND_TITLE + "</span></div></div>");

        if (SUBBRAND_TITLE_SWITCH) {
            $("#BrandName").after("<span id='SubBrandName' style='display: inline-block; white-space: nowrap ;font-family: SSG-FONT, RUBIK; margin-right: 4px;color: #ffffff; font-size: 30px;'>" + SUBBRAND_TITLE + "</span>");
        }

        fitTextToDiv('#BrandName');
        fitTextToDiv2('#SubBrandName');

        (function() {
            function l(a, b) {
                document.addEventListener ? a.addEventListener("scroll", b, !1) : a.attachEvent("scroll", b)
            }
            function m(a) {
                document.body ? a() : document.addEventListener ? document.addEventListener("DOMContentLoaded", function c() {
                    document.removeEventListener("DOMContentLoaded", c);
                    a()
                }) : document.attachEvent("onreadystatechange", function k() {
                    if ("interactive" == document.readyState || "complete" == document.readyState)
                        document.detachEvent("onreadystatechange", k),
                        a()
                })
            }
            ;function t(a) {
                this.a = document.createElement("div");
                this.a.setAttribute("aria-hidden", "true");
                this.a.appendChild(document.createTextNode(a));
                this.b = document.createElement("span");
                this.c = document.createElement("span");
                this.h = document.createElement("span");
                this.f = document.createElement("span");
                this.g = -1;
                this.b.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
                this.c.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
                this.f.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
                this.h.style.cssText = "display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";
                this.b.appendChild(this.h);
                this.c.appendChild(this.f);
                this.a.appendChild(this.b);
                this.a.appendChild(this.c)
            }
            function u(a, b) {
                a.a.style.cssText = "max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:" + b + ";"
            }
            function z(a) {
                var b = a.a.offsetWidth
                  , c = b + 100;
                a.f.style.width = c + "px";
                a.c.scrollLeft = c;
                a.b.scrollLeft = a.b.scrollWidth + 100;
                return a.g !== b ? (a.g = b,
                !0) : !1
            }
            function A(a, b) {
                function c() {
                    var a = k;
                    z(a) && a.a.parentNode && b(a.g)
                }
                var k = a;
                l(a.b, c);
                l(a.c, c);
                z(a)
            }
            ;function B(a, b) {
                var c = b || {};
                this.family = a;
                this.style = c.style || "normal";
                this.weight = c.weight || "normal";
                this.stretch = c.stretch || "normal"
            }
            var C = null
              , D = null
              , E = null
              , F = null;
            function G() {
                if (null === D)
                    if (J() && /Apple/.test(window.navigator.vendor)) {
                        var a = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);
                        D = !!a && 603 > parseInt(a[1], 10)
                    } else
                        D = !1;
                return D
            }
            function J() {
                null === F && (F = !!document.fonts);
                return F
            }
            function K() {
                if (null === E) {
                    var a = document.createElement("div");
                    try {
                        a.style.font = "condensed 100px sans-serif"
                    } catch (b) {}
                    E = "" !== a.style.font
                }
                return E
            }
            function L(a, b) {
                return [a.style, a.weight, K() ? a.stretch : "", "100px", b].join(" ")
            }
            B.prototype.load = function(a, b) {
                var c = this
                  , k = a || "BESbswy"
                  , r = 0
                  , n = b || 3E3
                  , H = (new Date).getTime();
                return new Promise(function(a, b) {
                    if (J() && !G()) {
                        var M = new Promise(function(a, b) {
                            function e() {
                                (new Date).getTime() - H >= n ? b(Error("" + n + "ms timeout exceeded")) : document.fonts.load(L(c, '"' + c.family + '"'), k).then(function(c) {
                                    1 <= c.length ? a() : setTimeout(e, 25)
                                }, b)
                            }
                            e()
                        }
                        )
                          , N = new Promise(function(a, c) {
                            r = setTimeout(function() {
                                c(Error("" + n + "ms timeout exceeded"))
                            }, n)
                        }
                        );
                        Promise.race([N, M]).then(function() {
                            clearTimeout(r);
                            a(c)
                        }, b)
                    } else
                        m(function() {
                            function v() {
                                var b;
                                if (b = -1 != f && -1 != g || -1 != f && -1 != h || -1 != g && -1 != h)
                                    (b = f != g && f != h && g != h) || (null === C && (b = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),
                                    C = !!b && (536 > parseInt(b[1], 10) || 536 === parseInt(b[1], 10) && 11 >= parseInt(b[2], 10))),
                                    b = C && (f == w && g == w && h == w || f == x && g == x && h == x || f == y && g == y && h == y)),
                                    b = !b;
                                b && (d.parentNode && d.parentNode.removeChild(d),
                                clearTimeout(r),
                                a(c))
                            }
                            function I() {
                                if ((new Date).getTime() - H >= n)
                                    d.parentNode && d.parentNode.removeChild(d),
                                    b(Error("" + n + "ms timeout exceeded"));
                                else {
                                    var a = document.hidden;
                                    if (!0 === a || void 0 === a)
                                        f = e.a.offsetWidth,
                                        g = p.a.offsetWidth,
                                        h = q.a.offsetWidth,
                                        v();
                                    r = setTimeout(I, 50)
                                }
                            }
                            var e = new t(k)
                              , p = new t(k)
                              , q = new t(k)
                              , f = -1
                              , g = -1
                              , h = -1
                              , w = -1
                              , x = -1
                              , y = -1
                              , d = document.createElement("div");
                            d.dir = "ltr";
                            u(e, L(c, "sans-serif"));
                            u(p, L(c, "serif"));
                            u(q, L(c, "monospace"));
                            d.appendChild(e.a);
                            d.appendChild(p.a);
                            d.appendChild(q.a);
                            document.body.appendChild(d);
                            w = e.a.offsetWidth;
                            x = p.a.offsetWidth;
                            y = q.a.offsetWidth;
                            I();
                            A(e, function(a) {
                                f = a;
                                v()
                            });
                            u(e, L(c, '"' + c.family + '",sans-serif'));
                            A(p, function(a) {
                                g = a;
                                v()
                            });
                            u(p, L(c, '"' + c.family + '",serif'));
                            A(q, function(a) {
                                h = a;
                                v()
                            });
                            u(q, L(c, '"' + c.family + '",monospace'))
                        })
                }
                )
            }
            ;
            "object" === typeof module ? module.exports = B : (window.FontFaceObserver = B,
            window.FontFaceObserver.prototype.load = B.prototype.load);
        }());

        var font = new FontFaceObserver('SSG-FONT');
        font.load().then(function() {
            fitTextToDiv('#BrandName');
            fitTextToDiv2('#SubBrandName');
        }).catch(function() {// alert('SSG-FONT font is not available.');
        });

        function fitTextToDiv(selector) {
            var $text = $(selector);
            var $container = $text.parents().eq(0);

            $text.css('font-size', '69px');
            while ($text.outerWidth() > $container.width() || $text.outerHeight() > $container.height()) {
                var currentSize = parseInt($text.css('font-size'));
                $text.css('font-size', (currentSize - 1) + 'px');
            }
        }

        function fitTextToDiv2(selector) {
            var $text = $(selector);
            var $container = $text.parents().eq(0);

            $text.css('font-size', '29px');
            while ($text.outerWidth() > $container.width() || $text.outerHeight() > $container.height()) {
                var currentSize = parseInt($text.css('font-size'));
                $text.css('font-size', (currentSize - 1) + 'px');
            }
        }

        $(window).resize(function() {
            fitTextToDiv('#BrandName');
            fitTextToDiv2('#SubBrandName');
        });
    }
}

function AddLogo() {
    if (LOGOBANNER_ENABLE) {
        $("#MainContainer").prepend("<div id='logoContainer' class='col-md-6 stretch-card'><div class='card w-100'><div class='card-body'><center><img id='logo' style='max-height: "+LOGOBANNER_HEIGHT+"px;' src='/"+LOGOBANNER_FILE_NAME+"'/></center></div></div></div>");
    }
}

function FooterHtmlCss(){
    if (ADD_FOOTER_EXTRA_HTML){
        $("#footer").show();
        FOOTER_CODE_EXTRA_HTML = FOOTER_CODE_EXTRA_HTML.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
        $("#footer").append(FOOTER_CODE_EXTRA_HTML);
    }else{
        $("#footer").hide();
    }
}  

function AddPromo(){
    if (PROMO) {
        $('#showPromo,#showOwner').show();
        if (PROMO_LABEL_SHOW){
            $("#PromoOption").append('<span id="PromoLabel">'+PROMO_LABEL+'</span>');
        }
        
        $("#PromoOption").append('<select id="PromoList" name="Promo" style="text-align: center;margin-bottom: 10px;"></select><h5 id="PromoName" class="w-100"></h5><span id="PromoSpeed" class="w-100"></span><span id="PromoDescription" class="w-100"></span>');
        
        $("#addCss").append('#PromoLabel{color: '+PROMO_LABEL_COLOR+';}#PromoList, #PromoList:active, #PromoList:focus, #PromoList:hover{height: 38px; color: '+PROMO_BUTTON_COLOR+';background: '+PROMO_BUTTON_BG+';border-color: '+PROMO_BUTTON_BRDR+';outline: none !important;}.ppn1{color: '+PROMO_PLAN1_COLOR+'!important;}.pps1{color: '+PROMO_SPEED1_COLOR+';}.ppd1{color: '+PROMO_DESCRIPTION1_COLOR+';}.ppn2{color: '+PROMO_PLAN2_COLOR+'!important;}.pps2{color: '+PROMO_SPEED2_COLOR+';}.ppd2{color: '+PROMO_DESCRIPTION2_COLOR+';}.ppn3{color: '+PROMO_PLAN3_COLOR+'!important;}.pps3{color: '+PROMO_SPEED3_COLOR+';}.ppd3{color: '+PROMO_DESCRIPTION3_COLOR+';}.ppn4{color: '+PROMO_PLAN4_COLOR+'!important;}.pps4{color: '+PROMO_SPEED4_COLOR+';}.ppd4{color: '+PROMO_DESCRIPTION4_COLOR+';}.ppn5{color: '+PROMO_PLAN5_COLOR+'!important;}.pps5{color: '+PROMO_SPEED5_COLOR+';}.ppd5{color: '+PROMO_DESCRIPTION5_COLOR+';}');
        var promoArray = PROMO_BUTTON_LIST.split(',').map(function(item) {
            return item.trim();
        });
        var select = document.getElementById('PromoList');
        for (var i = 0; i < parseInt(PROMO_LIST_COUNT); i++) {
            var option = document.createElement('option');
            option.text = promoArray[i];
            option.value = 'Promo' + (i + 1);
            select.appendChild(option);
        }
        function updatePromoDetails() {
            var selectedValue = select.value;
            var promoData = {
                'Promo1': {
                    plan: PROMO_PLAN1,
                    speed: PROMO_SPEED1,
                    description: PROMO_DESCRIPTION1,
                    class0: "ppn1",
                    class1: "pps1",
                    class2: "ppd1"
                },
                'Promo2': {
                    plan: PROMO_PLAN2,
                    speed: PROMO_SPEED2,
                    description: PROMO_DESCRIPTION2,
                    class0: "ppn2",
                    class1: "pps2",
                    class2: "ppd2"
                },
                'Promo3': {
                    plan: PROMO_PLAN3,
                    speed: PROMO_SPEED3,
                    description: PROMO_DESCRIPTION3,
                    class0: "ppn3",
                    class1: "pps3",
                    class2: "ppd3"
                },
                'Promo4': {
                    plan: PROMO_PLAN4,
                    speed: PROMO_SPEED4,
                    description: PROMO_DESCRIPTION4,
                    class0: "ppn4",
                    class1: "pps4",
                    class2: "ppd4"
                },
                'Promo5': {
                    plan: PROMO_PLAN5,
                    speed: PROMO_SPEED5,
                    description: PROMO_DESCRIPTION5,
                    class0: "ppn5",
                    class1: "pps5",
                    class2: "ppd5"
                }
            };
            var data = promoData[selectedValue];
            $('#PromoName').text(data.plan).attr("class", "w-100 " + data.class0);
            $('#PromoSpeed').text(data.speed).attr("class", "w-100 " + data.class1);
            $('#PromoDescription').text(data.description).attr("class", "w-100 " + data.class2);
        }
        updatePromoDetails();
        $('#PromoList').change(function() {
            updatePromoDetails();
        });
    }
}

function AddBank(){
    if ((ADD_GCASH_QR) || (ADD_PAYMAYA_QR) || (ADD_BPI_QR) || (ADD_SHOPEEPAY_QR) || (ADD_QRPH_QR) || (ADD_OTHER_QR)){
        if ($("#OnlineBankBTN").length === 0){
            if (PAYMENT_LABEL_SHOW){
                $("#PaymentBtn .card-body").append("<span class='paymentLabel'>"+PAYMENT_LABEL+"</span>");
            }
            
            $("#PaymentBtn .card-body").append("<div id='OnlineBankBTN' style='text-align: center;'></div>")
            $("body").append('<div class="modal fade" id="OnlineBankQrModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body"><div id="OnlineBankQrContent" class="text-center"></div></div></div></div></div>');

            if (!BRING_OUT_PAYMENT_BUTTON){
                $("#BtnGroupParent").append('<button id="PaymentContainer" class="btn btn-success w-100" style="margin-top: 10px;" data-bs-toggle="modal" data-bs-target="#PaymentBtn">'+PAYMENT_LABEL+'</button>');

                $("#PaymentBtn").attr("class", "modal fade no-padding").attr("data-bs-backdrop","static").attr("data-bs-keyboard","false").attr("tabindex","-1").attr("aria-hidden","true").attr("style","display: none;");
                $("#PaymentBtn .card").wrapAll("<div class='modal-dialog modal-dialog-centered'></div>");
                $("#PaymentBtn .card").attr("class", "modal-content");
                $("#PaymentBtn .card-body").attr("class","modal-body myspace-between text-center").attr("style","flex-direction: column; gap: 10px;");
                $("#PaymentBtn .modal-body").after('<div Style="padding: 16px;"><button type="button" class="btn btn-danger w-100" data-bs-dismiss="modal">Close</button></div>');
            }else{
                $("#PaymentBtn").show();
            }
        }
        
        if (ADD_GCASH_QR){
            $("#OnlineBankBTN").append("<button id='GcashBtn' class='btn' data-bs-toggle='modal' data-bs-target='#OnlineBankQrModal'><img class='img-btn' src='/files/gcash.svg' /></button>");
        }

        if (ADD_PAYMAYA_QR){
            $("#OnlineBankBTN").append("<button id='PaymayaBtn' class='btn' data-bs-toggle='modal' data-bs-target='#OnlineBankQrModal'><img class='img-btn' src='/files/maya.svg' /></button>");
        }

        if (ADD_BPI_QR){
            $("#OnlineBankBTN").append("<button id='BPIBtn' class='btn' data-bs-toggle='modal' data-bs-target='#OnlineBankQrModal'><img class='img-btn' src='/files/bpi.svg' /></button>");
        }

        if (ADD_SHOPEEPAY_QR){
            $("#OnlineBankBTN").append("<button id='SpayBtn' class='btn' data-bs-toggle='modal' data-bs-target='#OnlineBankQrModal'><img class='img-btn' src='/files/shopee.svg' /></button>");
        }

        if (ADD_QRPH_QR){
            $("#OnlineBankBTN").append("<button id='QRPHBtn' class='btn' data-bs-toggle='modal' data-bs-target='#OnlineBankQrModal'><img class='img-btn' src='/files/qrph.svg' /></button>");
        }

        if (ADD_OTHER_QR){
            $("#OnlineBankBTN").append("<button id='OtherBankBtn' class='btn' data-bs-toggle='modal' data-bs-target='#OnlineBankQrModal'><img class='img-btn' src='/"+BTN_LOGO_FILE+"' /></button>");
        }
        
        var qrOptions = {
            GcashBtn: {
                bankName: "files/gcash.svg",
                fileName: GCASH_QR_FILE_NAME
            },
            PaymayaBtn: {
                bankName: "files/maya.svg",
                fileName: PAYMAYA_QR_FILE_NAME
            },
            BPIBtn: {
                bankName: "files/bpi.svg",
                fileName: BPI_QR_FILE_NAME
            },
            SpayBtn: {
                bankName: "files/shopee.svg",
                fileName: SHOPEEPAY_QR_FILE_NAME
            },
            QRPHBtn: {
                bankName: "files/qrph.svg",
                fileName: QRPH_QR_FILE_NAME
            },
            OtherBankBtn: {
                bankName: BTN_LOGO_FILE,
                fileName: OTHER_QR_FILE_NAME
            }
        };

        // Function to handle QR code display
        function showQrCode(buttonId) {
            const contentDiv = $("#OnlineBankQrContent");
            const option = qrOptions[buttonId];
            contentDiv.empty();
            
            contentDiv.append(`<img class='w-100' src='/${option.fileName}' />`);
            contentDiv.append(`<img class='img-btn' style="margin-top: 10px" src='/${option.bankName}' />`);
            if (AMOUNT_SHOW){
                contentDiv.append(`<div><span class='amountLabel'>${AMOUNT_LABEL}</span><strong class='AmountVal'> ${amountValue}</strong></div>`);
            }
            if (SCREENSHOT_NOTE_SHOW){
                contentDiv.append(`<p>${SCREENSHOT_NOTE}</p>`);
            }
            contentDiv.append(`<button type="button" style="margin-top: 10px;" class="btn btn-danger w-100" data-bs-dismiss="modal">Close</button>`);
        }

        for (const buttonId in qrOptions) {
            $(`#${buttonId}`).on("click", function() {
                showQrCode(buttonId);
            });
        }
    } 
}

function SetMargin(){
    AutoMargin();
    $(window).resize(function() {
        AutoMargin();
    });

    function AutoMargin(){
        var brandTitleHeight = $('#BrandTitleContainer').outerHeight();
        var FooterHeight = $('#footer').outerHeight();
        $('#MyContainer').css('padding',brandTitleHeight+"px" + " 0 " + FooterHeight+"px" + " 0");
    }
}

function animation() {
    if (BACKGROUND_ANIMATION) {
        var hex = BACKGROUND_ANIMATION_COLOR;
        var red = parseInt(hex.substring(1, 3), 16);
        var green = parseInt(hex.substring(3, 5), 16);
        var blue = parseInt(hex.substring(5, 7), 16);
        var $animationColor2 = "rgba(" + red + ", " + green + ", " + blue + ", 0.07)";

        $("body").append('<div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div><div class="circle-container"><div class="circle"></div></div></div>');

        $("#addCss").append('.circle-container{position:fixed;left: 0; right: 0; top: -15px;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-timing-function:linear;animation-timing-function:linear}.circle-container .circle{width:100%;height:100%;border-radius:50%;mix-blend-mode:screen;background-image:radial-gradient(' + BACKGROUND_ANIMATION_COLOR + ',' + BACKGROUND_ANIMATION_COLOR + ' 10%,' + $animationColor2 + ' 56%);-webkit-animation:.2s infinite fadein-frames,2s infinite scale-frames;animation:.2s infinite fadein-frames,2s infinite scale-frames}@-webkit-keyframes fade-frames{0%,100%{opacity:1}50%{opacity:.7}}@keyframes fade-frames{0%,100%{opacity:1}50%{opacity:.7}}@-webkit-keyframes scale-frames{0%,100%{transform:scale3d(.4,.4,1)}50%{transform:scale3d(2.2,2.2,1)}}@keyframes scale-frames{0%,100%{transform:scale3d(.4,.4,1)}50%{transform:scale3d(2.2,2.2,1)}}.circle-container:first-child{width:2px;height:2px;-webkit-animation-name:move-frames-1;animation-name:move-frames-1;-webkit-animation-duration:30826ms;animation-duration:30826ms;-webkit-animation-delay:4045ms;animation-delay:4045ms}@-webkit-keyframes move-frames-1{from{transform:translate3d(95vw,101vh,0)}to{transform:translate3d(76vw,-113vh,0)}}@keyframes move-frames-1{from{transform:translate3d(95vw,101vh,0)}to{transform:translate3d(76vw,-113vh,0)}}.circle-container:first-child .circle{-webkit-animation-delay:2504ms;animation-delay:2504ms}.circle-container:nth-child(2){width:6px;height:6px;-webkit-animation-name:move-frames-2;animation-name:move-frames-2;-webkit-animation-duration:32908ms;animation-duration:32908ms;-webkit-animation-delay:11937ms;animation-delay:11937ms}@-webkit-keyframes move-frames-2{from{transform:translate3d(28vw,101vh,0)}to{transform:translate3d(37vw,-123vh,0)}}@keyframes move-frames-2{from{transform:translate3d(28vw,101vh,0)}to{transform:translate3d(37vw,-123vh,0)}}.circle-container:nth-child(2) .circle{-webkit-animation-delay:665ms;animation-delay:665ms}.circle-container:nth-child(3){width:2px;height:2px;-webkit-animation-name:move-frames-3;animation-name:move-frames-3;-webkit-animation-duration:29968ms;animation-duration:29968ms;-webkit-animation-delay:6.17s;animation-delay:6.17s}@-webkit-keyframes move-frames-3{from{transform:translate3d(47vw,101vh,0)}to{transform:translate3d(90vw,-105vh,0)}}@keyframes move-frames-3{from{transform:translate3d(47vw,101vh,0)}to{transform:translate3d(90vw,-105vh,0)}}.circle-container:nth-child(3) .circle{-webkit-animation-delay:3451ms;animation-delay:3451ms}.circle-container:nth-child(4){width:8px;height:8px;-webkit-animation-name:move-frames-4;animation-name:move-frames-4;-webkit-animation-duration:29192ms;animation-duration:29192ms;-webkit-animation-delay:25223ms;animation-delay:25223ms}@-webkit-keyframes move-frames-4{from{transform:translate3d(16vw,101vh,0)}to{transform:translate3d(63vw,-105vh,0)}}@keyframes move-frames-4{from{transform:translate3d(16vw,101vh,0)}to{transform:translate3d(63vw,-105vh,0)}}.circle-container:nth-child(4) .circle{-webkit-animation-delay:3648ms;animation-delay:3648ms}.circle-container:nth-child(5){width:8px;height:8px;-webkit-animation-name:move-frames-5;animation-name:move-frames-5;-webkit-animation-duration:34914ms;animation-duration:34914ms;-webkit-animation-delay:32325ms;animation-delay:32325ms}@-webkit-keyframes move-frames-5{from{transform:translate3d(2vw,101vh,0)}to{transform:translate3d(33vw,-120vh,0)}}@keyframes move-frames-5{from{transform:translate3d(2vw,101vh,0)}to{transform:translate3d(33vw,-120vh,0)}}.circle-container:nth-child(5) .circle{-webkit-animation-delay:1836ms;animation-delay:1836ms}.circle-container:nth-child(6){width:5px;height:5px;-webkit-animation-name:move-frames-6;animation-name:move-frames-6;-webkit-animation-duration:28662ms;animation-duration:28662ms;-webkit-animation-delay:31945ms;animation-delay:31945ms}@-webkit-keyframes move-frames-6{from{transform:translate3d(41vw,101vh,0)}to{transform:translate3d(30vw,-106vh,0)}}@keyframes move-frames-6{from{transform:translate3d(41vw,101vh,0)}to{transform:translate3d(30vw,-106vh,0)}}.circle-container:nth-child(6) .circle{-webkit-animation-delay:739ms;animation-delay:739ms}.circle-container:nth-child(7){width:3px;height:3px;-webkit-animation-name:move-frames-7;animation-name:move-frames-7;-webkit-animation-duration:32.35s;animation-duration:32.35s;-webkit-animation-delay:28425ms;animation-delay:28425ms}@-webkit-keyframes move-frames-7{from{transform:translate3d(23vw,101vh,0)}to{transform:translate3d(43vw,-125vh,0)}}@keyframes move-frames-7{from{transform:translate3d(23vw,101vh,0)}to{transform:translate3d(43vw,-125vh,0)}}.circle-container:nth-child(7) .circle{-webkit-animation-delay:101ms;animation-delay:101ms}.circle-container:nth-child(8){width:4px;height:4px;-webkit-animation-name:move-frames-8;animation-name:move-frames-8;-webkit-animation-duration:30703ms;animation-duration:30703ms;-webkit-animation-delay:35571ms;animation-delay:35571ms}@-webkit-keyframes move-frames-8{from{transform:translate3d(34vw,101vh,0)}to{transform:translate3d(21vw,-131vh,0)}}@keyframes move-frames-8{from{transform:translate3d(34vw,101vh,0)}to{transform:translate3d(21vw,-131vh,0)}}.circle-container:nth-child(8) .circle{-webkit-animation-delay:98ms;animation-delay:98ms}.circle-container:nth-child(9){width:2px;height:2px;-webkit-animation-name:move-frames-9;animation-name:move-frames-9;-webkit-animation-duration:32955ms;animation-duration:32955ms;-webkit-animation-delay:26031ms;animation-delay:26031ms}@-webkit-keyframes move-frames-9{from{transform:translate3d(66vw,101vh,0)}to{transform:translate3d(86vw,-102vh,0)}}@keyframes move-frames-9{from{transform:translate3d(66vw,101vh,0)}to{transform:translate3d(86vw,-102vh,0)}}.circle-container:nth-child(9) .circle{-webkit-animation-delay:1.47s;animation-delay:1.47s}.circle-container:nth-child(10){width:1px;height:1px;-webkit-animation-name:move-frames-10;animation-name:move-frames-10;-webkit-animation-duration:28.32s;animation-duration:28.32s;-webkit-animation-delay:4221ms;animation-delay:4221ms}@-webkit-keyframes move-frames-10{from{transform:translate3d(65vw,101vh,0)}to{transform:translate3d(4vw,-120vh,0)}}@keyframes move-frames-10{from{transform:translate3d(65vw,101vh,0)}to{transform:translate3d(4vw,-120vh,0)}}.circle-container:nth-child(10) .circle{-webkit-animation-delay:1124ms;animation-delay:1124ms}.circle-container:nth-child(11){width:8px;height:8px;-webkit-animation-name:move-frames-11;animation-name:move-frames-11;-webkit-animation-duration:29973ms;animation-duration:29973ms;-webkit-animation-delay:5095ms;animation-delay:5095ms}@-webkit-keyframes move-frames-11{from{transform:translate3d(2vw,101vh,0)}to{transform:translate3d(28vw,-123vh,0)}}@keyframes move-frames-11{from{transform:translate3d(2vw,101vh,0)}to{transform:translate3d(28vw,-123vh,0)}}.circle-container:nth-child(11) .circle{-webkit-animation-delay:1353ms;animation-delay:1353ms}.circle-container:nth-child(12){width:4px;height:4px;-webkit-animation-name:move-frames-12;animation-name:move-frames-12;-webkit-animation-duration:30555ms;animation-duration:30555ms;-webkit-animation-delay:29085ms;animation-delay:29085ms}@-webkit-keyframes move-frames-12{from{transform:translate3d(32vw,101vh,0)}to{transform:translate3d(44vw,-112vh,0)}}@keyframes move-frames-12{from{transform:translate3d(32vw,101vh,0)}to{transform:translate3d(44vw,-112vh,0)}}.circle-container:nth-child(12) .circle{-webkit-animation-delay:858ms;animation-delay:858ms}.circle-container:nth-child(13){width:5px;height:5px;-webkit-animation-name:move-frames-13;animation-name:move-frames-13;-webkit-animation-duration:31945ms;animation-duration:31945ms;-webkit-animation-delay:20794ms;animation-delay:20794ms}@-webkit-keyframes move-frames-13{from{transform:translate3d(78vw,101vh,0)}to{transform:translate3d(27vw,-130vh,0)}}@keyframes move-frames-13{from{transform:translate3d(78vw,101vh,0)}to{transform:translate3d(27vw,-130vh,0)}}.circle-container:nth-child(13) .circle{-webkit-animation-delay:2592ms;animation-delay:2592ms}.circle-container:nth-child(14){width:4px;height:4px;-webkit-animation-name:move-frames-14;animation-name:move-frames-14;-webkit-animation-duration:32743ms;animation-duration:32743ms;-webkit-animation-delay:35823ms;animation-delay:35823ms}@-webkit-keyframes move-frames-14{from{transform:translate3d(8vw,101vh,0)}to{transform:translate3d(90vw,-130vh,0)}}@keyframes move-frames-14{from{transform:translate3d(8vw,101vh,0)}to{transform:translate3d(90vw,-130vh,0)}}.circle-container:nth-child(14) .circle{-webkit-animation-delay:2384ms;animation-delay:2384ms}.circle-container:nth-child(15){width:3px;height:3px;-webkit-animation-name:move-frames-15;animation-name:move-frames-15;-webkit-animation-duration:31673ms;animation-duration:31673ms;-webkit-animation-delay:12261ms;animation-delay:12261ms}@-webkit-keyframes move-frames-15{from{transform:translate3d(68vw,101vh,0)}to{transform:translate3d(13vw,-125vh,0)}}@keyframes move-frames-15{from{transform:translate3d(68vw,101vh,0)}to{transform:translate3d(13vw,-125vh,0)}}.circle-container:nth-child(15) .circle{-webkit-animation-delay:151ms;animation-delay:151ms}.circle-container:nth-child(16){width:2px;height:2px;-webkit-animation-name:move-frames-16;animation-name:move-frames-16;-webkit-animation-duration:29.93s;animation-duration:29.93s;-webkit-animation-delay:35s;animation-delay:35s}@-webkit-keyframes move-frames-16{from{transform:translate3d(61vw,101vh,0)}to{transform:translate3d(59vw,-109vh,0)}}@keyframes move-frames-16{from{transform:translate3d(61vw,101vh,0)}to{transform:translate3d(59vw,-109vh,0)}}.circle-container:nth-child(16) .circle{-webkit-animation-delay:462ms;animation-delay:462ms}.circle-container:nth-child(17){width:6px;height:6px;-webkit-animation-name:move-frames-17;animation-name:move-frames-17;-webkit-animation-duration:30533ms;animation-duration:30533ms;-webkit-animation-delay:28209ms;animation-delay:28209ms}@-webkit-keyframes move-frames-17{from{transform:translate3d(89vw,101vh,0)}to{transform:translate3d(7vw,-114vh,0)}}@keyframes move-frames-17{from{transform:translate3d(89vw,101vh,0)}to{transform:translate3d(7vw,-114vh,0)}}.circle-container:nth-child(17) .circle{-webkit-animation-delay:3.98s;animation-delay:3.98s}.circle-container:nth-child(18){width:5px;height:5px;-webkit-animation-name:move-frames-18;animation-name:move-frames-18;-webkit-animation-duration:30892ms;animation-duration:30892ms;-webkit-animation-delay:13002ms;animation-delay:13002ms}@-webkit-keyframes move-frames-18{from{transform:translate3d(12vw,101vh,0)}to{transform:translate3d(94vw,-124vh,0)}}@keyframes move-frames-18{from{transform:translate3d(12vw,101vh,0)}to{transform:translate3d(94vw,-124vh,0)}}.circle-container:nth-child(18) .circle{-webkit-animation-delay:190ms;animation-delay:190ms}.circle-container:nth-child(19){width:6px;height:6px;-webkit-animation-name:move-frames-19;animation-name:move-frames-19;-webkit-animation-duration:28792ms;animation-duration:28792ms;-webkit-animation-delay:29769ms;animation-delay:29769ms}@-webkit-keyframes move-frames-19{from{transform:translate3d(8vw,101vh,0)}to{transform:translate3d(62vw,-130vh,0)}}@keyframes move-frames-19{from{transform:translate3d(8vw,101vh,0)}to{transform:translate3d(62vw,-130vh,0)}}.circle-container:nth-child(19) .circle{-webkit-animation-delay:3534ms;animation-delay:3534ms}.circle-container:nth-child(20){width:6px;height:6px;-webkit-animation-name:move-frames-20;animation-name:move-frames-20;-webkit-animation-duration:30303ms;animation-duration:30303ms;-webkit-animation-delay:2955ms;animation-delay:2955ms}@-webkit-keyframes move-frames-20{from{transform:translate3d(76vw,101vh,0)}to{transform:translate3d(25vw,-113vh,0)}}@keyframes move-frames-20{from{transform:translate3d(76vw,101vh,0)}to{transform:translate3d(25vw,-113vh,0)}}.circle-container:nth-child(20) .circle{-webkit-animation-delay:1.67s;animation-delay:1.67s}.circle-container:nth-child(21){width:3px;height:3px;-webkit-animation-name:move-frames-21;animation-name:move-frames-21;-webkit-animation-duration:29193ms;animation-duration:29193ms;-webkit-animation-delay:32868ms;animation-delay:32868ms}@-webkit-keyframes move-frames-21{from{transform:translate3d(56vw,101vh,0)}to{transform:translate3d(3vw,-124vh,0)}}@keyframes move-frames-21{from{transform:translate3d(56vw,101vh,0)}to{transform:translate3d(3vw,-124vh,0)}}.circle-container:nth-child(21) .circle{-webkit-animation-delay:810ms;animation-delay:810ms}.circle-container:nth-child(22){width:7px;height:7px;-webkit-animation-name:move-frames-22;animation-name:move-frames-22;-webkit-animation-duration:35329ms;animation-duration:35329ms;-webkit-animation-delay:27964ms;animation-delay:27964ms}@-webkit-keyframes move-frames-22{from{transform:translate3d(69vw,101vh,0)}to{transform:translate3d(26vw,-107vh,0)}}@keyframes move-frames-22{from{transform:translate3d(69vw,101vh,0)}to{transform:translate3d(26vw,-107vh,0)}}.circle-container:nth-child(22) .circle,.circle-container:nth-child(29) .circle{-webkit-animation-delay:1887ms;animation-delay:1887ms}.circle-container:nth-child(23){width:7px;height:7px;-webkit-animation-name:move-frames-23;animation-name:move-frames-23;-webkit-animation-duration:32941ms;animation-duration:32941ms;-webkit-animation-delay:12901ms;animation-delay:12901ms}@-webkit-keyframes move-frames-23{from{transform:translate3d(44vw,101vh,0)}to{transform:translate3d(76vw,-128vh,0)}}@keyframes move-frames-23{from{transform:translate3d(44vw,101vh,0)}to{transform:translate3d(76vw,-128vh,0)}}.circle-container:nth-child(23) .circle{-webkit-animation-delay:1545ms;animation-delay:1545ms}.circle-container:nth-child(24){width:8px;height:8px;-webkit-animation-name:move-frames-24;animation-name:move-frames-24;-webkit-animation-duration:30099ms;animation-duration:30099ms;-webkit-animation-delay:14747ms;animation-delay:14747ms}@-webkit-keyframes move-frames-24{from{transform:translate3d(8vw,101vh,0)}to{transform:translate3d(91vw,-109vh,0)}}@keyframes move-frames-24{from{transform:translate3d(8vw,101vh,0)}to{transform:translate3d(91vw,-109vh,0)}}.circle-container:nth-child(24) .circle{-webkit-animation-delay:841ms;animation-delay:841ms}.circle-container:nth-child(25){width:4px;height:4px;-webkit-animation-name:move-frames-25;animation-name:move-frames-25;-webkit-animation-duration:34998ms;animation-duration:34998ms;-webkit-animation-delay:18302ms;animation-delay:18302ms}@-webkit-keyframes move-frames-25{from{transform:translate3d(43vw,101vh,0)}to{transform:translate3d(43vw,-123vh,0)}}@keyframes move-frames-25{from{transform:translate3d(43vw,101vh,0)}to{transform:translate3d(43vw,-123vh,0)}}.circle-container:nth-child(25) .circle{-webkit-animation-delay:2.49s;animation-delay:2.49s}.circle-container:nth-child(26){width:3px;height:3px;-webkit-animation-name:move-frames-26;animation-name:move-frames-26;-webkit-animation-duration:28721ms;animation-duration:28721ms;-webkit-animation-delay:32447ms;animation-delay:32447ms}@-webkit-keyframes move-frames-26{from{transform:translate3d(42vw,101vh,0)}to{transform:translate3d(31vw,-120vh,0)}}@keyframes move-frames-26{from{transform:translate3d(42vw,101vh,0)}to{transform:translate3d(31vw,-120vh,0)}}.circle-container:nth-child(26) .circle{-webkit-animation-delay:2932ms;animation-delay:2932ms}.circle-container:nth-child(27){width:1px;height:1px;-webkit-animation-name:move-frames-27;animation-name:move-frames-27;-webkit-animation-duration:29618ms;animation-duration:29618ms;-webkit-animation-delay:11821ms;animation-delay:11821ms}@-webkit-keyframes move-frames-27{from{transform:translate3d(82vw,101vh,0)}to{transform:translate3d(77vw,-116vh,0)}}@keyframes move-frames-27{from{transform:translate3d(82vw,101vh,0)}to{transform:translate3d(77vw,-116vh,0)}}.circle-container:nth-child(27) .circle{-webkit-animation-delay:3677ms;animation-delay:3677ms}.circle-container:nth-child(28){width:7px;height:7px;-webkit-animation-name:move-frames-28;animation-name:move-frames-28;-webkit-animation-duration:29292ms;animation-duration:29292ms;-webkit-animation-delay:19663ms;animation-delay:19663ms}@-webkit-keyframes move-frames-28{from{transform:translate3d(3vw,101vh,0)}to{transform:translate3d(30vw,-129vh,0)}}@keyframes move-frames-28{from{transform:translate3d(3vw,101vh,0)}to{transform:translate3d(30vw,-129vh,0)}}.circle-container:nth-child(28) .circle{-webkit-animation-delay:484ms;animation-delay:484ms}.circle-container:nth-child(29){width:1px;height:1px;-webkit-animation-name:move-frames-29;animation-name:move-frames-29;-webkit-animation-duration:31758ms;animation-duration:31758ms;-webkit-animation-delay:10377ms;animation-delay:10377ms}@-webkit-keyframes move-frames-29{from{transform:translate3d(49vw,101vh,0)}to{transform:translate3d(51vw,-118vh,0)}}@keyframes move-frames-29{from{transform:translate3d(49vw,101vh,0)}to{transform:translate3d(51vw,-118vh,0)}}.circle-container:nth-child(30){width:3px;height:3px;-webkit-animation-name:move-frames-30;animation-name:move-frames-30;-webkit-animation-duration:32415ms;animation-duration:32415ms;-webkit-animation-delay:4149ms;animation-delay:4149ms}@-webkit-keyframes move-frames-30{from{transform:translate3d(20vw,101vh,0)}to{transform:translate3d(5vw,-110vh,0)}}@keyframes move-frames-30{from{transform:translate3d(20vw,101vh,0)}to{transform:translate3d(5vw,-110vh,0)}}.circle-container:nth-child(30) .circle{-webkit-animation-delay:3087ms;animation-delay:3087ms}.circle-container:nth-child(31){width:8px;height:8px;-webkit-animation-name:move-frames-31;animation-name:move-frames-31;-webkit-animation-duration:36.68s;animation-duration:36.68s;-webkit-animation-delay:1035ms;animation-delay:1035ms}@-webkit-keyframes move-frames-31{from{transform:translate3d(38vw,101vh,0)}to{transform:translate3d(66vw,-119vh,0)}}@keyframes move-frames-31{from{transform:translate3d(38vw,101vh,0)}to{transform:translate3d(66vw,-119vh,0)}}.circle-container:nth-child(31) .circle{-webkit-animation-delay:2117ms;animation-delay:2117ms}.circle-container:nth-child(32){width:4px;height:4px;-webkit-animation-name:move-frames-32;animation-name:move-frames-32;-webkit-animation-duration:35081ms;animation-duration:35081ms;-webkit-animation-delay:10792ms;animation-delay:10792ms}@-webkit-keyframes move-frames-32{from{transform:translate3d(33vw,101vh,0)}to{transform:translate3d(65vw,-130vh,0)}}@keyframes move-frames-32{from{transform:translate3d(33vw,101vh,0)}to{transform:translate3d(65vw,-130vh,0)}}.circle-container:nth-child(32) .circle{-webkit-animation-delay:87ms;animation-delay:87ms}.circle-container:nth-child(33){width:7px;height:7px;-webkit-animation-name:move-frames-33;animation-name:move-frames-33;-webkit-animation-duration:32.79s;animation-duration:32.79s;-webkit-animation-delay:12327ms;animation-delay:12327ms}@-webkit-keyframes move-frames-33{from{transform:translate3d(89vw,101vh,0)}to{transform:translate3d(70vw,-104vh,0)}}@keyframes move-frames-33{from{transform:translate3d(89vw,101vh,0)}to{transform:translate3d(70vw,-104vh,0)}}.circle-container:nth-child(33) .circle{-webkit-animation-delay:2452ms;animation-delay:2452ms}.circle-container:nth-child(34){width:5px;height:5px;-webkit-animation-name:move-frames-34;animation-name:move-frames-34;-webkit-animation-duration:28105ms;animation-duration:28105ms;-webkit-animation-delay:11931ms;animation-delay:11931ms}@-webkit-keyframes move-frames-34{from{transform:translate3d(35vw,101vh,0)}to{transform:translate3d(43vw,-118vh,0)}}@keyframes move-frames-34{from{transform:translate3d(35vw,101vh,0)}to{transform:translate3d(43vw,-118vh,0)}}.circle-container:nth-child(34) .circle{-webkit-animation-delay:1217ms;animation-delay:1217ms}.circle-container:nth-child(35){width:7px;height:7px;-webkit-animation-name:move-frames-35;animation-name:move-frames-35;-webkit-animation-duration:34808ms;animation-duration:34808ms;-webkit-animation-delay:11872ms;animation-delay:11872ms}@-webkit-keyframes move-frames-35{from{transform:translate3d(40vw,101vh,0)}to{transform:translate3d(40vw,-110vh,0)}}@keyframes move-frames-35{from{transform:translate3d(40vw,101vh,0)}to{transform:translate3d(40vw,-110vh,0)}}.circle-container:nth-child(35) .circle{-webkit-animation-delay:3575ms;animation-delay:3575ms}.circle-container:nth-child(36){width:6px;height:6px;-webkit-animation-name:move-frames-36;animation-name:move-frames-36;-webkit-animation-duration:30994ms;animation-duration:30994ms;-webkit-animation-delay:869ms;animation-delay:869ms}@-webkit-keyframes move-frames-36{from{transform:translate3d(16vw,101vh,0)}to{transform:translate3d(15vw,-105vh,0)}}@keyframes move-frames-36{from{transform:translate3d(16vw,101vh,0)}to{transform:translate3d(15vw,-105vh,0)}}.circle-container:nth-child(36) .circle{-webkit-animation-delay:299ms;animation-delay:299ms}.circle-container:nth-child(37){width:7px;height:7px;-webkit-animation-name:move-frames-37;animation-name:move-frames-37;-webkit-animation-duration:33286ms;animation-duration:33286ms;-webkit-animation-delay:7747ms;animation-delay:7747ms}@-webkit-keyframes move-frames-37{from{transform:translate3d(87vw,101vh,0)}to{transform:translate3d(51vw,-122vh,0)}}@keyframes move-frames-37{from{transform:translate3d(87vw,101vh,0)}to{transform:translate3d(51vw,-122vh,0)}}.circle-container:nth-child(37) .circle{-webkit-animation-delay:1438ms;animation-delay:1438ms}.circle-container:nth-child(38){width:7px;height:7px;-webkit-animation-name:move-frames-38;animation-name:move-frames-38;-webkit-animation-duration:33841ms;animation-duration:33841ms;-webkit-animation-delay:28313ms;animation-delay:28313ms}@-webkit-keyframes move-frames-38{from{transform:translate3d(2vw,101vh,0)}to{transform:translate3d(23vw,-131vh,0)}}@keyframes move-frames-38{from{transform:translate3d(2vw,101vh,0)}to{transform:translate3d(23vw,-131vh,0)}}.circle-container:nth-child(38) .circle{-webkit-animation-delay:876ms;animation-delay:876ms}.circle-container:nth-child(39){width:7px;height:7px;-webkit-animation-name:move-frames-39;animation-name:move-frames-39;-webkit-animation-duration:36363ms;animation-duration:36363ms;-webkit-animation-delay:20891ms;animation-delay:20891ms}@-webkit-keyframes move-frames-39{from{transform:translate3d(31vw,101vh,0)}to{transform:translate3d(22vw,-131vh,0)}}@keyframes move-frames-39{from{transform:translate3d(31vw,101vh,0)}to{transform:translate3d(22vw,-131vh,0)}}.circle-container:nth-child(39) .circle{-webkit-animation-delay:3899ms;animation-delay:3899ms}.circle-container:nth-child(40){width:3px;height:3px;-webkit-animation-name:move-frames-40;animation-name:move-frames-40;-webkit-animation-duration:34796ms;animation-duration:34796ms;-webkit-animation-delay:15409ms;animation-delay:15409ms}@-webkit-keyframes move-frames-40{from{transform:translate3d(6vw,101vh,0)}to{transform:translate3d(92vw,-114vh,0)}}@keyframes move-frames-40{from{transform:translate3d(6vw,101vh,0)}to{transform:translate3d(92vw,-114vh,0)}}.circle-container:nth-child(40) .circle{-webkit-animation-delay:3111ms;animation-delay:3111ms}.circle-container:nth-child(41){width:5px;height:5px;-webkit-animation-name:move-frames-41;animation-name:move-frames-41;-webkit-animation-duration:29206ms;animation-duration:29206ms;-webkit-animation-delay:21.13s;animation-delay:21.13s}@-webkit-keyframes move-frames-41{from{transform:translate3d(72vw,101vh,0)}to{transform:translate3d(41vw,-128vh,0)}}@keyframes move-frames-41{from{transform:translate3d(72vw,101vh,0)}to{transform:translate3d(41vw,-128vh,0)}}.circle-container:nth-child(41) .circle{-webkit-animation-delay:1238ms;animation-delay:1238ms}.circle-container:nth-child(42){width:7px;height:7px;-webkit-animation-name:move-frames-42;animation-name:move-frames-42;-webkit-animation-duration:35097ms;animation-duration:35097ms;-webkit-animation-delay:19261ms;animation-delay:19261ms}@-webkit-keyframes move-frames-42{from{transform:translate3d(68vw,101vh,0)}to{transform:translate3d(78vw,-128vh,0)}}@keyframes move-frames-42{from{transform:translate3d(68vw,101vh,0)}to{transform:translate3d(78vw,-128vh,0)}}.circle-container:nth-child(42) .circle{-webkit-animation-delay:1911ms;animation-delay:1911ms}.circle-container:nth-child(43){width:2px;height:2px;-webkit-animation-name:move-frames-43;animation-name:move-frames-43;-webkit-animation-duration:36458ms;animation-duration:36458ms;-webkit-animation-delay:10.04s;animation-delay:10.04s}@-webkit-keyframes move-frames-43{from{transform:translate3d(90vw,101vh,0)}to{transform:translate3d(43vw,-104vh,0)}}@keyframes move-frames-43{from{transform:translate3d(90vw,101vh,0)}to{transform:translate3d(43vw,-104vh,0)}}.circle-container:nth-child(43) .circle{-webkit-animation-delay:1786ms;animation-delay:1786ms}.circle-container:nth-child(44){width:3px;height:3px;-webkit-animation-name:move-frames-44;animation-name:move-frames-44;-webkit-animation-duration:35331ms;animation-duration:35331ms;-webkit-animation-delay:10.42s;animation-delay:10.42s}@-webkit-keyframes move-frames-44{from{transform:translate3d(20vw,101vh,0)}to{transform:translate3d(64vw,-114vh,0)}}@keyframes move-frames-44{from{transform:translate3d(20vw,101vh,0)}to{transform:translate3d(64vw,-114vh,0)}}.circle-container:nth-child(44) .circle{-webkit-animation-delay:2708ms;animation-delay:2708ms}.circle-container:nth-child(45){width:4px;height:4px;-webkit-animation-name:move-frames-45;animation-name:move-frames-45;-webkit-animation-duration:29109ms;animation-duration:29109ms;-webkit-animation-delay:33188ms;animation-delay:33188ms}@-webkit-keyframes move-frames-45{from{transform:translate3d(91vw,101vh,0)}to{transform:translate3d(45vw,-125vh,0)}}@keyframes move-frames-45{from{transform:translate3d(91vw,101vh,0)}to{transform:translate3d(45vw,-125vh,0)}}.circle-container:nth-child(45) .circle{-webkit-animation-delay:2.54s;animation-delay:2.54s}.circle-container:nth-child(46){width:5px;height:5px;-webkit-animation-name:move-frames-46;animation-name:move-frames-46;-webkit-animation-duration:32139ms;animation-duration:32139ms;-webkit-animation-delay:20481ms;animation-delay:20481ms}@-webkit-keyframes move-frames-46{from{transform:translate3d(15vw,101vh,0)}to{transform:translate3d(100vw,-118vh,0)}}@keyframes move-frames-46{from{transform:translate3d(15vw,101vh,0)}to{transform:translate3d(100vw,-118vh,0)}}.circle-container:nth-child(46) .circle{-webkit-animation-delay:3146ms;animation-delay:3146ms}.circle-container:nth-child(47){width:3px;height:3px;-webkit-animation-name:move-frames-47;animation-name:move-frames-47;-webkit-animation-duration:33495ms;animation-duration:33495ms;-webkit-animation-delay:5528ms;animation-delay:5528ms}@-webkit-keyframes move-frames-47{from{transform:translate3d(66vw,101vh,0)}to{transform:translate3d(50vw,-105vh,0)}}@keyframes move-frames-47{from{transform:translate3d(66vw,101vh,0)}to{transform:translate3d(50vw,-105vh,0)}}.circle-container:nth-child(47) .circle{-webkit-animation-delay:3658ms;animation-delay:3658ms}.circle-container:nth-child(48){width:5px;height:5px;-webkit-animation-name:move-frames-48;animation-name:move-frames-48;-webkit-animation-duration:33528ms;animation-duration:33528ms;-webkit-animation-delay:34614ms;animation-delay:34614ms}@-webkit-keyframes move-frames-48{from{transform:translate3d(26vw,101vh,0)}to{transform:translate3d(49vw,-106vh,0)}}@keyframes move-frames-48{from{transform:translate3d(26vw,101vh,0)}to{transform:translate3d(49vw,-106vh,0)}}.circle-container:nth-child(48) .circle{-webkit-animation-delay:189ms;animation-delay:189ms}.circle-container:nth-child(49){width:7px;height:7px;-webkit-animation-name:move-frames-49;animation-name:move-frames-49;-webkit-animation-duration:33765ms;animation-duration:33765ms;-webkit-animation-delay:10348ms;animation-delay:10348ms}@-webkit-keyframes move-frames-49{from{transform:translate3d(3vw,101vh,0)}to{transform:translate3d(80vw,-105vh,0)}}@keyframes move-frames-49{from{transform:translate3d(3vw,101vh,0)}to{transform:translate3d(80vw,-105vh,0)}}.circle-container:nth-child(49) .circle{-webkit-animation-delay:785ms;animation-delay:785ms}.circle-container:nth-child(50){width:2px;height:2px;-webkit-animation-name:move-frames-50;animation-name:move-frames-50;-webkit-animation-duration:32848ms;animation-duration:32848ms;-webkit-animation-delay:4.95s;animation-delay:4.95s}@-webkit-keyframes move-frames-50{from{transform:translate3d(25vw,101vh,0)}to{transform:translate3d(55vw,-120vh,0)}}@keyframes move-frames-50{from{transform:translate3d(25vw,101vh,0)}to{transform:translate3d(55vw,-120vh,0)}}.circle-container:nth-child(50) .circle{-webkit-animation-delay:1677ms;animation-delay:1677ms}');
    }
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if ($(selector).length) {
            return resolve($(selector));
        }
        const observer = new MutationObserver(mutations => {
            if ($(selector).length) {
                observer.disconnect();
                resolve($(selector));
            }
        }
        );
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    );
} 

})
.fail(function(jqxhr, settings, exception) {
    alert("SSG-CONFIG NOT FOUND");
});

