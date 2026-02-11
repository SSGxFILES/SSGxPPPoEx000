var currentUrl = window.location.href;
var urlObj = new URL(currentUrl);
var ipWEB = urlObj.hostname;
var backUpFile = "/html/![PPPoE]";
var TimeStamp = "?v="+new Date().getTime();
let FirstTimePPPoe = true;
let AdminFileDetected = false;
let previousStatus = null;
let currentStatus = null;
const url = 'http://' + ipWEB + '/admin?page=dashboard';
const searchText = 'Logout';
async function CheckLogin(url, searchText) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const text = await response.text();
        if (text.includes(searchText)) {
            currentStatus = 'connected';
            $("#loginText").text("ADMIN CONNECTED");
            $("#loginStats").attr("class", "text-success").show();

            if (previousStatus !== 'connected') {
                if ($('#file-list-ssgpppoehtml').length > 0) {
                    if ($('#files').length > 0) {
                        $('div [role="files"]').trigger("click");
                        GET_SERIAL();
                        RunCode();
                    }
                }
            }
        } else {
            currentStatus = 'logout';
            $("#loginText").text("ADMIN LOGOUT");
            $("#loginStats").attr("class", "text-danger").show();
        }

        if (previousStatus !== null && previousStatus !== currentStatus) {
            location.reload();
        }
        previousStatus = currentStatus;

    } catch (error) {
        console.error('Error fetching the page: ' + error);
    }
}

CheckLogin(url, searchText);
setInterval(() => {
    CheckLogin(url, searchText);
}, 1000);

setInterval(() => {
    console.clear();
}, 100);

var cleanedValue;
function GET_SERIAL(){
    $("#license").trigger("click");
    waitForElm("#license-features").then((elm)=>{
            var targetSrTxt = document.querySelector("#license-features");
            var observerSrTxt = new MutationObserver(function(mutations) {
            var srVal = $('#license-features tr:contains("Serial") td:last').text();
            var keyVal = $('#license-features tr:contains("Key") td:last').text();
            if (srVal != ""){
                var cutSr = srVal.substring(0, 15);
                ky = keyVal.charAt(0).toUpperCase() + keyVal.slice(1);
                sr = 0+cutSr; 
                function s(i,s,r){return i.replace(s, r);}
                var fx=sr+"PPPoE00",r=s(fx),n=s(r,/\D/g,""),l=s(r,/[^a-z]/gi,""),p=0;for(var c=0;c<l.length;++c)p+=l[c].charCodeAt(0)-1992;var f="SSG-PPPoE"+(n*p);var o=s(f,"1","X"),p1=s(o,"5","X");p2=p1;
                var GetID = sessionStorage.getItem("PPPoEThemeID"); 
                if (GetID){
                    $("#PPPoE-Theme-ID").val(GetID).trigger("change");
                    sessionStorage.removeItem("PPPoEThemeID");
                }
                $("#serial").text("Serial: " + sr + " RawSerial: " + srVal);
                $("#key").text("License: " + ky);
                $("#license-features").parents().eq(7).attr("id", "license-features-parents");
                $("#license-features-parents .modal-footer .btn-danger").trigger("click");
                $("#license-features-parents").next('div').hide().remove();
                $("#license-features-parents").hide().remove();
                $("body").removeAttr("class");
                $("#ToRemove").remove();
                observerSrTxt.disconnect();
            }
        });
        var configSrTxt = { attributes: true, childList: true, characterData: true };
        observerSrTxt.observe(targetSrTxt, configSrTxt); 
    });
}
var sr;
var p2;
var ProceedApply = false;

function RunCode(){
    $("textarea").on("change input load", function() {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
    });
    var DarkLightSwitch;
    DarkLightSwitchFunc();
    function DarkLightSwitchFunc(){
        $('input[name="ThemeSetup"]').on('change', function() {
            if ($('#Dark-Theme').is(':checked')) {
                DarkLightSwitch = true;
                DarkTheme();

            } else if ($('#Light-Theme').is(':checked')) {
                DarkLightSwitch = false;
                LightTheme();
            }
        });
    }

    var OnlinePayment;
    OnlinePaymentFunc();
    function OnlinePaymentFunc(){
        $("#OnlinePayment").on("change", function(){
            if ($(this).is(":checked")){
                OnlinePayment = true;
            }else{
                OnlinePayment = false;
            }
        });
    }

    var LogoBanner;
    var LogoBannerFile;
    var LogoBannerPrevFile;
    var LogoBannerHeight;
    LogoBannerFunc();
    LogoBannerHeightFunc();
    LogoBannerFileFunc();
    function LogoBannerFunc(){
        $("#LogoBanner").on("change", function(){
            if ($(this).is(":checked")){
                LogoBanner = true;
                $("#LogoBanner-Container").show();
            }else{
                LogoBanner = false;
                $("#LogoBanner-Container").hide();
            }
        });
    }
    function LogoBannerHeightFunc(){
        $("#LogoBannerHeight").on("input change paste", function(){
            if (/^0+$/.test($(this).val())) {
            LogoBannerHeight = "100";
            $("#LogoBannerHeight").val(LogoBannerHeight);
            changeHeight();
            }else{
                LogoBannerHeight = $(this).val();
                changeHeight();
            }
        });
        $('#LogoBannerHeight').on('blur', function() {
            if (!$(this).val()){
                $(this).val("100");
                LogoBannerHeight = $(this).val();
                changeHeight();
            }
        });
        function changeHeight(){
            $("#LogoBannerFilePreview").css("max-height", LogoBannerHeight+"px").css("width", "fit-content");
        }
    }
    function LogoBannerCheckFunc(){
        if (!LogoBannerFile) {
            $("#LogoBannerFilePreview").attr('src', "").hide();
            $("#LogoBannerFileDisplay").html('<i class="fa fa-upload" aria-hidden="true"></i> Upload Logo or Banner');
        }else{
            $("#LogoBannerFilePreview").attr('src', backUpFile+LogoBannerFile+TimeStamp).show();
            $("#LogoBannerFileDisplay").html('<i class="fa fa-upload" aria-hidden="true"></i>' + " " + LogoBannerFile);
        }
    }
    function LogoBannerFileFunc(){
        $("#LogoBannerFile").on(" change", function(event) {
            handleFileSelection(event, "#LogoBannerFile");
        });

        $("#LogoBannerFileDisplay").on("click", function() {
            $("#LogoBannerFile").trigger("click");
        });
    }

    var BrandTitleBackground;
    var BrandTitleBrdr;
    BrandTitleBackgroundFunc();
    BrandTitleBrdrFunc();
    function BrandTitleBackgroundFunc(){
        $("#BrandTitleBackGround-Picker, #BrandTitleBackGroundOpacity").on("input change", function(){
            BrandTitleBackgroundOpacityColor();
        })
        function BrandTitleBackgroundOpacityColor(){
            var percentage = Math.floor($("#BrandTitleBackGroundOpacity").val() * 100);
            $("#BrandTitleBackGroundOpacity-label").text("Background Color "+ percentage + "%");
            var color = $('#BrandTitleBackGround-Picker').val();
            var alpha = $('#BrandTitleBackGroundOpacity').val();
            BrandTitleBackgroundcolor = color;
            BrandTitleBackgroundalpha = alpha;
            var rgbaColor = hexToRgba(color, alpha);
            BrandTitleBackground = rgbaColor;       
            $("#BrandTitleBackGround-Label").css("background",BrandTitleBackground).css("text-shadow", "0 0 5px #000");   
        }
    }
    function BrandTitleBrdrFunc(){
        $("#BrandTitleBrdr-Picker, #BrandTitleBrdrOpacity").on("input change", function(){
            BrandTitleBrdrOpacityColor();
        })
        function BrandTitleBrdrOpacityColor(){
            var percentage = Math.floor($("#BrandTitleBrdrOpacity").val() * 100);
            $("#BrandTitleBrdrOpacity-label").text("Border Color "+ percentage + "%");
            var color = $('#BrandTitleBrdr-Picker').val();
            var alpha = $('#BrandTitleBrdrOpacity').val();
            BrandTitleBrdrcolor = color;
            BrandTitleBrdralpha = alpha;
            var rgbaColor = hexToRgba(color, alpha);
            BrandTitleBrdr = rgbaColor;       
            $("#BrandTitleBackGround-Label").css("border","solid 1px "+BrandTitleBrdr).css("text-shadow", "0 0 5px #000");   
        }
    }

    var BrandTitle;
    var BrandTitleText;
    var BrandTitleFX;
    var fx1BrandTitle;
    var fx2BrandTitle;
    var fx3BrandTitle;
    var fx4BrandTitle;
    var fx5BrandTitle;
    var fx6BrandTitle;
    BrandTitleFunc();
    BrandTitleTextFunc();
    BrandTitleTextFXFunc();
    fx1BrandTitleFunc();
    fx2BrandTitleFunc();
    fx3BrandTitleFunc();
    fx4BrandTitleFunc();
    fx5BrandTitleFunc();
    fx6BrandTitleFunc();
    function BrandTitleFunc(){
        $("#BrandTitle").on("change", function(){
            if ($(this).is(":checked")){
                BrandTitle = true;
                $("#BrandTitle-Container, #BrandTitleTextFXContainer, #subbrandtitleDiv").show();
                $("head").append("<style id='animationText'>@keyframes animated_text{0%{background-position-x:0}100%{background-position-x:10000px}}</stye>")
            }else{
                BrandTitle = false;
                $("#BrandTitle-Container, #BrandTitleTextFXContainer,#subbrandtitleDiv").hide();
                $("#animationText").remove();
            }
        });
    }
    function BrandTitleTextFunc(){
        $("#BrandTitleText").on("input change paste", function(){
            this.value = this.value.toUpperCase();
            BrandTitleText = $(this).val();
            BrandTitleTextAnimation();
        })
    }
    function BrandTitleTextFXFunc(){
        $("#BrandTitleTextFX").on("change", function(){
            if ($(this).is(":checked")){
                BrandTitleFX = true;
            }else{
                BrandTitleFX = false;
            }
            BrandTitleTextAnimation();
        })
    }
    function fx1BrandTitleFunc(){
        $("#fx1-BrandTitle").on("input change", function(){
            fx1BrandTitle = $(this).val();
            BrandTitleTextAnimation();
        });
    }
    function fx2BrandTitleFunc(){
        $("#fx2-BrandTitle").on("input change", function(){
            fx2BrandTitle = $(this).val();
            BrandTitleTextAnimation();
        });
    }
    function fx3BrandTitleFunc(){
        $("#fx3-BrandTitle").on("input change", function(){
            fx3BrandTitle = $(this).val();
            BrandTitleTextAnimation();
        });
    }
    function fx4BrandTitleFunc(){
        $("#fx4-BrandTitle").on("input change", function(){
            fx4BrandTitle = $(this).val();
            BrandTitleTextAnimation();
        });
    }
    function fx5BrandTitleFunc(){
        $("#fx5-BrandTitle").on("input change", function(){
            fx5BrandTitle = $(this).val();
            BrandTitleTextAnimation();
        });
    }
    function fx6BrandTitleFunc(){
        $("#fx6-BrandTitle").on("input change", function(){
            fx6BrandTitle = $(this).val();
            BrandTitleTextAnimation();
        });
    }

    var SubBrandTitle;
    var SubBrandTitleText;
    var SubBrandTitleFX;
    var fx1SubBrandTitle;
    var fx2SubBrandTitle;
    var fx3SubBrandTitle;
    var fx4SubBrandTitle;
    var fx5SubBrandTitle;
    var fx6SubBrandTitle;
    SubBrandTitleFunc();
    SubBrandTitleTextFunc();
    SubBrandTitleTextFXFunc();
    fx1SubBrandTitleFunc();
    fx2SubBrandTitleFunc();
    fx3SubBrandTitleFunc();
    fx4SubBrandTitleFunc();
    fx5SubBrandTitleFunc();
    fx6SubBrandTitleFunc();
    function SubBrandTitleFunc(){
        $("#SubBrandTitle").on("change", function(){
            if ($(this).is(":checked")){
                SubBrandTitle = true;
                $("#SubBrandTitle-Container, #SubBrandTitleTextFXContainer").show();
            }else{
                SubBrandTitle = false;
                $("#SubBrandTitle-Container, #SubBrandTitleTextFXContainer").hide();
            }
        });
    }
    function SubBrandTitleTextFunc(){
        $("#SubBrandTitleText").on("input change", function(){
            this.value = this.value.toUpperCase();
            SubBrandTitleText = $(this).val();
            BrandTitleTextAnimation();
        })
    }
    function SubBrandTitleTextFXFunc(){
        $("#SubBrandTitleTextFX").on("change", function(){
            if ($(this).is(":checked")){
                SubBrandTitleFX = true;
            }else{
                SubBrandTitleFX = false;
            }
            BrandTitleTextAnimation();
        })
    }
    function fx1SubBrandTitleFunc(){
        $("#fx1-SubBrandTitle").on("input change", function(){
            fx1SubBrandTitle = $(this).val();
            BrandTitleTextAnimation();
        });
    }
    function fx2SubBrandTitleFunc(){
        $("#fx2-SubBrandTitle").on("input change", function(){
            fx2SubBrandTitle = $(this).val();
            BrandTitleTextAnimation();
        });
    }
    function fx3SubBrandTitleFunc(){
        $("#fx3-SubBrandTitle").on("input change", function(){
            fx3SubBrandTitle = $(this).val();
            BrandTitleTextAnimation();
        });
    }
    function fx4SubBrandTitleFunc(){
        $("#fx4-SubBrandTitle").on("input change", function(){
            fx4SubBrandTitle = $(this).val();
            BrandTitleTextAnimation();
        });
    }
    function fx5SubBrandTitleFunc(){
        $("#fx5-SubBrandTitle").on("input change", function(){
            fx5SubBrandTitle = $(this).val();
            BrandTitleTextAnimation();
        });
    }
    function fx6SubBrandTitleFunc(){
        $("#fx6-SubBrandTitle").on("input change", function(){
            fx6SubBrandTitle = $(this).val();
            BrandTitleTextAnimation();
        });
    }
    function BrandTitleTextAnimation(){
        $("#BrandTitleText").attr("style","background:linear-gradient(to left, "+ fx1BrandTitle +", "+ fx2BrandTitle +", "+ fx3BrandTitle +", "+ fx4BrandTitle +", "+ fx5BrandTitle +", "+ fx6BrandTitle +");background-size:300%;background-clip: text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-family: 'SSG';font-size: 30px!important;line-height: 1;");
        if (BrandTitleFX){
            $('#BrandTitleText').css({
            'animation': '25s linear infinite animated_text',
            '-webkit-animation': '25s linear infinite animated_text',
            '-moz-animation': '25s linear infinite animated_text'
            });
        }else{
            $('#BrandTitleText').css({
            'animation': 'none',
            '-webkit-animation': 'none',
            '-moz-animation': 'none'
            });
        }
        
        $("#SubBrandTitleText").attr("style","background:linear-gradient(to left, "+ fx1SubBrandTitle +", "+ fx2SubBrandTitle +", "+ fx3SubBrandTitle +", "+ fx4SubBrandTitle +", "+ fx5SubBrandTitle +", "+ fx6SubBrandTitle +");background-size:300%;background-clip: text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-family: 'SSG';font-size: 20px!important;line-height: 1;");

        if (SubBrandTitleFX){
            $('#SubBrandTitleText').css({
            'animation': '25s linear infinite animated_text',
            '-webkit-animation': '25s linear infinite animated_text',
            '-moz-animation': '25s linear infinite animated_text'
            });
        }else{
            $('#SubBrandTitleText').css({
            'animation': 'none',
            '-webkit-animation': 'none',
            '-moz-animation': 'none'
            });
        }
        function adjustHeightBrandTitle() {
            var el = $("#BrandTitleText")[0];
            el.style.height = "auto";
            el.style.height = el.scrollHeight + "px";
        }
        adjustHeightBrandTitle();
        function adjustHeightSubBrandTitle() {
            var el = $("#SubBrandTitleText")[0];
            el.style.height = "auto";
            el.style.height = el.scrollHeight + "px";
        }
        adjustHeightSubBrandTitle();
    }

    var CustomContainerSwitch;
    CustomContainerFunc();
    function CustomContainerFunc(){
         $("#CustomContainerSwitch").on("change", function(){
            if ($(this).is(":checked")){
                CustomContainerSwitch = true;
                $('head').append('<style id="customCntnr">#PortalBg-Container, #ModalBg-Container{border-radius:0;clip-path:polygon(0 12px,12px 0,calc(100%) 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 calc(100%));-webkit-clip-path:polygon(0 12px,12px 0,calc(100%) 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 calc(100%));position:relative;border:none!important}#PortalBg-Container::before, #ModalBg-Container::before{content:"";position:absolute;top:0;left:0;right:0;bottom:0;clip-path:polygon(0 12px,12px 0,calc(100%) 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 calc(100%),0 12px,0.05em calc(12px + 0.05em),0.05em calc(100% - 0.05em),calc(12px + 0.05em) calc(100% - 0.05em),calc(100% - 12px - 0.05em) calc(100% - 0.05em),calc(100% - 0.05em) calc(100% - 12px - 0.05em),calc(100% - 0.05em) calc(12px + 0.05em),calc(100% - 0.05em) 0.05em,calc(12px + 0.05em) 0.05em,0.05em calc(12px + 0.05em));-webkit-clip-path:polygon(0 12px,12px 0,calc(100%) 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 calc(100%),0 12px,0.05em calc(12px + 0.05em),0.05em calc(100% - 0.05em),calc(12px + 0.05em) calc(100% - 0.05em),calc(100% - 12px - 0.05em) calc(100% - 0.05em),calc(100% - 0.05em) calc(100% - 12px - 0.05em),calc(100% - 0.05em) calc(12px + 0.05em),calc(100% - 0.05em) 0.05em,calc(12px + 0.05em) 0.05em,0.05em calc(12px + 0.05em));box-sizing:border-box;pointer-events:none;background: lch(17.43 8.54 271.86 / .5);}</style>');
            }else{
                CustomContainerSwitch = false;
                $("#customCntnr").remove();
            }
        });
    }

    var MainBgImage;
    var MainBgImageFile;
    var MainBgPrevFile;
    var MainBgColor;
    MainBgFunc();
    MainBgImageFileFunc();
    MainBgColorFunc();
    function MainBgFunc(){
        $('input[name="MainBgSettings"]').on('change', function() {
            if ($('#MainBg-Image').is(':checked')) {
                MainBgImage = true;
                $("#MainBGFile-Container").show();
                $("#MainBGColor-Container").hide();

            } else if ($('#MainBg-Color').is(':checked')) {
                MainBgImage = false;
                $("#MainBGFile-Container").hide();
                $("#MainBGColor-Container").show();
            }
        });
    }
    function MainBgImageFileCheckFunc(){
        if (!MainBgImageFile) {
            $("#MainBgFilePreview").attr('src', '').hide();
            $("#MainBgFileDisplay").html('<i class="fa fa-upload" aria-hidden="true"></i> Upload Main Background');
        }else{
            $("#MainBgFilePreview").attr('src', backUpFile+MainBgImageFile+TimeStamp).show();
            $("#MainBgFileDisplay").html('<i class="fa fa-upload" aria-hidden="true"></i>' + " " + MainBgImageFile);
        }
    }
    function MainBgImageFileFunc(){
        $("#MainBgFile").on(" change", function(event) {
            handleFileSelection(event, "#MainBgFile");
        });

        $("#MainBgFileDisplay").on("click", function() {
            $("#MainBgFile").trigger("click");
        });
    }
    function MainBgColorFunc(){
        $("#MainBgColor-Picker1").on("input change", function(){   
            $("#MainBgColor-Label").css("background", $(this).val()).css("text-shadow", "0 0 5px #000");
            MainBgColor = $(this).val();
            $("#MainBgColor-Label").text(MainBgColor);
        });
    }

    var PortalBgImage;
    var PortalBgImageFile;
    var PortalBgPrevFile;
    var PortalBgColor;
    var PortalBgColorBorder;
    PortalBgFunc();
    PortalBgImageFileFunc();
    PortalBgColorFunc();
    PortalBgColorBorderFunc();
    function PortalBgFunc(){
        $('input[name="PortalBgSettings"]').on('change', function() {
            if ($('#PortalBg-Image').is(':checked')) {
                PortalBgImage = true;
                $("#PortalBgFile-Container").show();
                $("#PortalBgColor-Container").hide();
            } else if ($('#PortalBg-Color').is(':checked')) {
                PortalBgImage = false;
                $("#PortalBgFile-Container").hide();
                $("#PortalBgColor-Container").show();   
            }
        });
    }
    function PortalBgImageFileCheckFunc(){
        if (!PortalBgImageFile) {
            $("#PortalBgFilePreview").attr('src', '').hide();
            $("#PortalBgFileDisplay").html('<i class="fa fa-upload" aria-hidden="true"></i> Upload Portal Background');
        }else{
            $("#PortalBgFilePreview").attr('src', backUpFile+PortalBgImageFile+TimeStamp).show();
            $("#PortalBgFileDisplay").html('<i class="fa fa-upload" aria-hidden="true"></i>' + " " + PortalBgImageFile);
        }
    }
    function PortalBgImageFileFunc(){
        $("#PortalBgFile").on(" change", function(event) {
            handleFileSelection(event, "#PortalBgFile");
        });

        $("#PortalBgFileDisplay").on("click", function() {
            $("#PortalBgFile").trigger("click");
        });
    }
    function PortalBgColorFunc(){
        $("#PortalBgColor-Picker1, #PortalBG1Opacity").on("input change", function(){   
            PortalBG1OpacityColor();
        });

        function PortalBG1OpacityColor(){
        var percentage = Math.floor($("#PortalBG1Opacity").val() * 100);
        $("#PortalBG1Opacity-label").text("Background Color " + percentage + "%");
        var color = $('#PortalBgColor-Picker1').val();
        var alpha = $('#PortalBG1Opacity').val();
        var rgbaColor = hexToRgba(color, alpha);
        PortalBgColor = rgbaColor;   
        $("#PortalBgColor-Label").css("background",PortalBgColor).css("text-shadow", "0 0 5px #000");       
    }
    }
    function PortalBgColorBorderFunc(){ 
        $("#PortalBgColorBorder-Picker, #PortalBgColorBorderOpacity").on("input change", function(){
            PortalBgColorBorderOpacityColor();
        })
        function PortalBgColorBorderOpacityColor(){
            var percentage = Math.floor($("#PortalBgColorBorderOpacity").val() * 100);
            $("#PortalBgColorBorderOpacity-label").text("Border Color "+ percentage + "%");
            var color = $('#PortalBgColorBorder-Picker').val();
            var alpha = $('#PortalBgColorBorderOpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            PortalBgColorBorder = rgbaColor;       
            $("#PortalBgColor-Label").css("border","solid 2px "+PortalBgColorBorder).css("text-shadow", "0 0 5px #000");   
        }
    }

    var ModalBgImage;
    var ModalBgImageFile;
    var ModalBgPrevFile;
    var ModalBgColor;
    var ModalBgColorBorder;
    ModalBgFunc();
    ModalBgImageFileFunc();
    ModalBgColorFunc();
    ModalBgColorBorderFunc();
    function ModalBgFunc(){
        $('input[name="ModalBgSettings"]').on('change', function() {
            if ($('#ModalBg-Image').is(':checked')) {
                ModalBgImage = true;
                $("#ModalBgFile-Container").show();
                $("#ModalBgColor-Container").hide();
            } else if ($('#ModalBg-Color').is(':checked')) {
                ModalBgImage = false;
                $("#ModalBgFile-Container").hide();
                $("#ModalBgColor-Container").show();   
            }
        });
    }
    function ModalBgImageFileCheckFunc(){
        if (!ModalBgImageFile) {
            $("#ModalBgFilePreview").attr('src', '').hide();
            $("#ModalBgFileDisplay").html('<i class="fa fa-upload" aria-hidden="true"></i> Upload Modal Background');
        }else{
            $("#ModalBgFilePreview").attr('src', backUpFile+ModalBgImageFile+TimeStamp).show();
            $("#ModalBgFileDisplay").html('<i class="fa fa-upload" aria-hidden="true"></i>' + " " + ModalBgImageFile);
        }
    }
    function ModalBgImageFileFunc(){
        $("#ModalBgFile").on(" change", function(event) {
            handleFileSelection(event, "#ModalBgFile");
        });

        $("#ModalBgFileDisplay").on("click", function() {
            $("#ModalBgFile").trigger("click");
        });
    }
    function ModalBgColorFunc(){
        $("#ModalBgColor-Picker1, #ModalBG1Opacity").on("input change", function(){   
            ModalBG1OpacityColor();
        });

        function ModalBG1OpacityColor(){
        var percentage = Math.floor($("#ModalBG1Opacity").val() * 100);
        $("#ModalBG1Opacity-label").text("Background Color " + percentage + "%");
        var color = $('#ModalBgColor-Picker1').val();
        var alpha = $('#ModalBG1Opacity').val();
        var rgbaColor = hexToRgba(color, alpha);
        ModalBgColor = rgbaColor;   
        $("#ModalBgColor-Label").css("background",ModalBgColor).css("text-shadow", "0 0 5px #000");       
    }
    }
    function ModalBgColorBorderFunc(){ 
        $("#ModalBgColorBorder-Picker, #ModalBgColorBorderOpacity").on("input change", function(){
            ModalBgColorBorderOpacityColor();
        })
        function ModalBgColorBorderOpacityColor(){
            var percentage = Math.floor($("#ModalBgColorBorderOpacity").val() * 100);
            $("#ModalBgColorBorderOpacity-label").text("Border Color "+ percentage + "%");
            var color = $('#ModalBgColorBorder-Picker').val();
            var alpha = $('#ModalBgColorBorderOpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            ModalBgColorBorder = rgbaColor;       
            $("#ModalBgColor-Label").css("border","solid 2px "+ModalBgColorBorder).css("text-shadow", "0 0 5px #000");   
        }
    }

    var BGfx;
    var BGFxColor;
    BGfxFunc();
    BGfxColorFunc();
    function BGfxFunc(){
        $("#BGFX").on("change", function(){
            if ($(this).is(":checked")){
                BGfx = true;
                $("#GBFX-Color").show();
            }else{
                BGfx = false;
                $("#GBFX-Color").hide();
            }
        });
    }
    function BGfxColorFunc(){
        $("#GBFX-ColorPicker").on("input change", function(){
            $("#GBFX-ColorLabel").css("background", $(this).val()).css("text-shadow", "0 0 5px #000");   
            BGFxColor = $(this).val();
            $("#GBFX-ColorLabel").text(BGFxColor);
        })
    }
    var StatsShow;
    var ActiveColor;
    var ExpiredColor;
    var statsLabel;
    var statsLabelColor;
    StatsShowFunc();
    ActiveColorFunc();
    ExpiredColorFunc();
    statsLabelFunc();
    statsLabelColorFunc();
    function StatsShowFunc(){
        $("#StatsActiveExpiredSwitch").on("change", function(){
            if ($(this).is(":checked")){
                StatsShow = true;
                $("#StatsActiveExpiredContent").show();
            }else{
                StatsShow = false;
                $("#StatsActiveExpiredContent").hide();
            }
        });
    }
    function ActiveColorFunc(){
        $("#Active-Picker").on("input change", function(){
            $("#Active-Label").css("color",$(this).val()).css("text-shadow","0 0 2px #222"); 
            ActiveColor = $(this).val();
        })
    }
    function ExpiredColorFunc(){
        $("#Expired-Picker").on("input change", function(){
            $("#Expired-Label").css("color",$(this).val()).css("text-shadow","0 0 2px #222"); 
            ExpiredColor = $(this).val();
        })
    }
    function statsLabelFunc(){
        $("#statsLabel-Label").on("input change",function(){
            statsLabel = $(this).val();
        });
    }
    function statsLabelColorFunc(){
        $("#statsLabel-Picker").on("input change", function(){
            $("#statsLabel-Label").css("color", $(this).val());
            statsLabelColor = $(this).val();
        });
    }

    var ExpDateShow;
    var ExpDateColor;
    var expLabel;
    var expLabelColor;
    ExpDateShowFunc();
    expLabelFunc();
    expLabelColorFunc();
    ExpDateColorFunc();
    function ExpDateShowFunc(){
        $("#ExpDateSwitch").on("change", function(){
            if ($(this).is(":checked")){
                ExpDateShow = true;
                $("#ExpDateContent").show();
            }else{
                ExpDateShow = false;
                $("#ExpDateContent").hide();
            }
        });
    }
    function ExpDateColorFunc(){
        $("#ExpDate-Picker").on("input change", function(){
            $("#ExpDate-Label").css("color",$(this).val()).css("text-shadow","0 0 2px #222");   
            ExpDateColor = $(this).val();
        })
    }
    function expLabelFunc(){
        $("#expLabel-Label").on("input change",function(){
            expLabel = $(this).val();
        });
    }
    function expLabelColorFunc(){
        $("#expLabel-Picker").on("input change", function(){
            $("#expLabel-Label").css("color", $(this).val());
            expLabelColor= $(this).val();
        });
    }
   
    var AmountValShow;
    var AmountValColor;
    var amountLabel;
    var amountLabelColor;
    AmountValShowFunc();
    AmountValColorFunc();
    amountLabelFunc();
    amountLabelColorFunc();
    function AmountValShowFunc(){
        $("#AmountValSwitch").on("change", function(){
            if ($(this).is(":checked")){
                AmountValShow = true;
                $("#AmountValContent").show();
            }else{
                AmountValShow = false;
                $("#AmountValContent").hide();
            }
        });
    }
    function AmountValColorFunc(){
        $("#AmountVal-Picker").on("input change", function(){
            $("#AmountVal-Label").css("color",$(this).val()).css("text-shadow","0 0 2px #222");   
            AmountValColor = $(this).val();
        })
    }
    function amountLabelFunc(){
        $("#amountLabel-Label").on("input change",function(){
            amountLabel = $(this).val();
        });
    }
    function amountLabelColorFunc(){
        $("#amountLabel-Picker").on("input change", function(){
            $("#amountLabel-Label").css("color", $(this).val());
            amountLabelColor = $(this).val();
        });
    }

    var SpeedShow;
    var SpeedColor;
    var speedLabel;
    var speedLabelColor;
    SpeedShowFunc();
    SpeedColorFunc();
    speedLabelFunc();
    speedLabelColorFunc();
    function SpeedShowFunc(){
        $("#SpeedSwitch").on("change", function(){
            if ($(this).is(":checked")){
                SpeedShow = true;
                $("#SpeedContent").show();
            }else{
                SpeedShow = false;
                $("#SpeedContent").hide();
            }
        });
    }
    function SpeedColorFunc(){
        $("#Speed-Picker").on("input change", function(){
            $("#Speed-Label").css("color",$(this).val()).css("text-shadow","0 0 2px #222");   
            SpeedColor = $(this).val();
        })
    }
    function speedLabelFunc(){
        $("#speedLabel-Label").on("input change",function(){
            speedLabel = $(this).val();
        });
    }
    function speedLabelColorFunc(){
        $("#speedLabel-Picker").on("input change", function(){
            $("#speedLabel-Label").css("color", $(this).val());
            speedLabelColor = $(this).val();
        });
    }

    var IPShow;
    var IPColor;
    var ipLabel;
    var ipLabelColor;
    IPShowFunc();
    IPColorFunc();
    ipLabelFunc();
    ipLabelColorFunc();
    function IPShowFunc(){
        $("#IPSwitch").on("change", function(){
            if ($(this).is(":checked")){
                IPShow = true;
                $("#IPContent").show();
            }else{
                IPShow = false;
                $("#IPContent").hide();
            }
        });
    }
    function IPColorFunc(){
        $("#IP-Picker").on("input change", function(){
            $("#IP-Label").css("color",$(this).val()).css("text-shadow","0 0 2px #222");   
            IPColor = $(this).val();
        })
    }
    function ipLabelFunc(){
        $("#ipLabel-Label").on("input change",function(){
            ipLabel = $(this).val();
        });
    }
    function ipLabelColorFunc(){
        $("#ipLabel-Picker").on("input change", function(){
            $("#ipLabel-Label").css("color", $(this).val());
            ipLabelColor = $(this).val();
        });
    }

    var MACShow;
    var MACColor;
    var macLabel;
    var macLabelColor;
    MACShowFunc();
    MACColorFunc();
    macLabelFunc();
    macLabelColorFunc();
    function MACShowFunc(){
        $("#MACSwitch").on("change", function(){
            if ($(this).is(":checked")){
                MACShow = true;
                $("#MACContent").show();
            }else{
                MACShow = false;
                $("#MACContent").hide();
            }
        });
    }
    function MACColorFunc(){
        $("#MAC-Picker").on("input change", function(){
            $("#MAC-Label").css("color",$(this).val()).css("text-shadow","0 0 2px #222");   
            MACColor = $(this).val();
        })
    }
    function macLabelFunc(){
        $("#macLabel-Label").on("input change",function(){
            macLabel = $(this).val();
        });
    }
    function macLabelColorFunc(){
        $("#macLabel-Picker").on("input change", function(){
            $("#macLabel-Label").css("color", $(this).val());
            macLabelColor = $(this).val();
        });
    }
    
    var ActiveStatsShow;
    var ActiveStats;
    var ActiveStatsColor;
    ActiveStatsShowFunc();
    ActiveStatsFunc();
    ActiveStatsColorFunc();
    function ActiveStatsShowFunc(){
        $("#ActiveStatsSwitch").on("change", function(){
            if ($(this).is(":checked")){
                ActiveStatsShow = true;
                $("#ActiveStats-Container").show();
            }else{
                ActiveStatsShow = false;
                $("#ActiveStats-Container").hide();
            }
        });
    }
    function ActiveStatsFunc(){
        $("#ActiveStats-Label").on("input change",function(){
            ActiveStats = $(this).val();
        });
    }
    function ActiveStatsColorFunc(){
        $("#ActiveStats-Picker").on("input change", function(){
            $("#ActiveStats-Label").css("color", $(this).val());
            ActiveStatsColor = $(this).val();
        });
    }

    var activeTextInfoShow;
    var activeTextInfo;
    var activeTextInfoColor;
    activeTextInfoShowFunc();
    activeTextInfoFunc();
    activeTextInfoColorFunc();
    function activeTextInfoShowFunc(){
        $("#ActiveStatsInfoSwitch").on("change", function(){
            if ($(this).is(":checked")){
                activeTextInfoShow = true;
                $("#activeTextInfo-Container").show();
            }else{
                activeTextInfoShow = false;
                $("#activeTextInfo-Container").hide();
            }
        });
    }
    function activeTextInfoFunc(){
        $("#activeTextInfo-Label").on("input change",function(){
            activeTextInfo = $(this).val();
        });
    }
    function activeTextInfoColorFunc(){
        $("#activeTextInfo-Picker").on("input change", function(){
            $("#activeTextInfo-Label").css("color", $(this).val());
            activeTextInfoColor = $(this).val();
        });
    }

    var ExpStatsShow;
    var ExpStats;
    var ExpStatsColor;
    ExpStatsShowFunc();
    ExpStatsFunc();
    ExpStatsColorFunc();
    function ExpStatsShowFunc(){
        $("#ExpStatsSwitch").on("change", function(){
            if ($(this).is(":checked")){
                ExpStatsShow = true;
                $("#ExpStats-Container").show();
            }else{
                ExpStatsShow = false;
                $("#ExpStats-Container").hide();
            }
        });
    }
    function ExpStatsFunc(){
        $("#ExpStats-Label").on("input change",function(){
            ExpStats = $(this).val();
        });
    }
    function ExpStatsColorFunc(){
        $("#ExpStats-Picker").on("input change", function(){
            $("#ExpStats-Label").css("color", $(this).val());
            ExpStatsColor= $(this).val();
        });
    }

    var expiredTextInfoShow;
    var expiredTextInfo;
    var expiredTextInfoColor;
    expiredTextInfoShowFunc();
    expiredTextInfoFunc();
    expiredTextInfoColorFunc();
    function expiredTextInfoShowFunc(){
        $("#ExpStatsInfoSwitch").on("change", function(){
            if ($(this).is(":checked")){
                expiredTextInfoShow = true;
                $("#expiredTextInfo-Container").show();
            }else{
                expiredTextInfoShow = false;
                $("#expiredTextInfo-Container").hide();
            }
        });
    }
    function expiredTextInfoFunc(){
        $("#expiredTextInfo-Label").on("input change",function(){
            expiredTextInfo = $(this).val();
        });
    }
    function expiredTextInfoColorFunc(){
        $("#expiredTextInfo-Picker").on("input change", function(){
            $("#expiredTextInfo-Label").css("color", $(this).val());
            expiredTextInfoColor = $(this).val();
        });
    }

    var ssTextInfoShow;
    var ssTextInfo;
    var ssTextInfoColor;
    ssTextInfoShowFunc();
    ssTextInfoFunc();
    ssTextInfoColorFunc();
    function ssTextInfoShowFunc(){
        $("#ssTextSwitch").on("change", function(){
            if ($(this).is(":checked")){
                ssTextInfoShow = true;
                $("#ssTextInfo-Container").show();
            }else{
                ssTextInfoShow = false;
                $("#ssTextInfo-Container").hide();
            }
        });
    }
    function ssTextInfoFunc(){
        $("#ssTextInfo-Label").on("input change",function(){
            ssTextInfo = $(this).val();
        });
    }
    function ssTextInfoColorFunc(){
        $("#ssTextInfo-Picker").on("input change", function(){
            $("#ssTextInfo-Label").css("color", $(this).val());
            ssTextInfoColor = $(this).val();
        });
    }

    var OwnerInfoShow;
    var OwnerToBtn;
    var MessengerName;
    var MessengerLink;
    var MessengerColor;
    var ContactNumber;
    var ContactNumberColor;
    var EmailName;
    var EmailColor;
    var LocationAdd;
    var LocationAddColor;
    OwnerInfoShowFunc();
    OwnerToBtnFunc();
    MessengerNameFunc();
    MessengerLinkFunc();
    MessengerColorFunc();
    ContactNumberFunc();
    ContactNumberColorFunc();
    EmailNameFunc();
    EmailColorFunc();
    LocationAddFunc();
    LocationAddColorFunc();
    function OwnerInfoShowFunc(){
        $("#OwnerInfoSwitch").on("change", function(){
            if ($(this).is(":checked")){
                OwnerInfoShow = true;
                $("#OwnerInfo-Container").show();
            }else{
                OwnerInfoShow = false;
                $("#OwnerInfo-Container").hide();
            }
        });
    }
    function OwnerToBtnFunc(){
        $("#OwnerToBtnSwitch").on("change", function(){
            if ($(this).is(":checked")){
                OwnerToBtn = true;
            }else{
                OwnerToBtn = false;
            }
        });
    }
    function MessengerNameFunc(){
        $("#Messenger-Label").on("input change",function(){
            MessengerName = $(this).val();
        });
    }
    function MessengerLinkFunc(){
        $("#Messenger-Link").on("input change",function(){
            MessengerLink = $(this).val();
        });
    }
    function MessengerColorFunc(){
        $("#Messenger-Picker").on("input change", function(){
            $("#Messenger-Label,#Messenger-Link").css("color", $(this).val());
            MessengerColor = $(this).val();
        });
    }
    function ContactNumberFunc(){
        $("#ContactNumber-Label").on("input change",function(){
            ContactNumber = $(this).val();
        });
    }
    function ContactNumberColorFunc(){
        $("#ContactNumber-Picker").on("input change", function(){
            $("#ContactNumber-Label").css("color", $(this).val());
            ContactNumberColor = $(this).val();
        });
    }
    function EmailNameFunc(){
        $("#Email-Label").on("input change",function(){
            EmailName = $(this).val();
        });
    }
    function EmailColorFunc(){
        $("#Email-Picker").on("input change", function(){
            $("#Email-Label").css("color", $(this).val());
            EmailColor = $(this).val();
        });
    }
    function LocationAddFunc(){
        $("#Location-Label").on("input change",function(){
            LocationAdd = $(this).val();
        });
    }
    function LocationAddColorFunc(){
        $("#Location-Picker").on("input change", function(){
            $("#Location-Label").css("color", $(this).val());
            LocationAddColor = $(this).val();
        });
    }

    var ExtraHtmlCssSwitch;
    var ExtraHtmlCssCode;
    var ExtraHtmlBackground;
    var ExtraHtmlBrdr;
    ExtraHtmlCssSwitchFunc();
    ExtraHtmlCssCodeFunc();
    ExtraHtmlBackgroundFunc();
    ExtraHtmlBrdrFunc();
    function ExtraHtmlCssSwitchFunc(){
        $("#ExtraHtml").on("change", function(){
            if ($(this).is(":checked")){
                ExtraHtmlCssSwitch = true;
                $("#ExtraHtml-Label").show();
            }else{
                ExtraHtmlCssSwitch = false;
                $("#ExtraHtml-Label").hide();
            }
        });
    }
    function ExtraHtmlCssCodeFunc(){
        $("#ExtraHtml-Label").on("input change paste", function(){
            ExtraHtmlCssCode = $(this).val();
        })
    }
    function ExtraHtmlBackgroundFunc(){
        $("#ExtraHtmlBackGround-Picker, #ExtraHtmlBackGroundOpacity").on("input change", function(){
            ExtraHtmlBGOpacityColor();
        })
        function ExtraHtmlBGOpacityColor(){
            var percentage = Math.floor($("#ExtraHtmlBackGroundOpacity").val() * 100);
            $("#ExtraHtmlBackGroundOpacity-label").text("Background Color "+ percentage + "%");
            var color = $('#ExtraHtmlBackGround-Picker').val();
            var alpha = $('#ExtraHtmlBackGroundOpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            ExtraHtmlBackground = rgbaColor;       
            $("#ExtraHtmlBackGround-Label").css("background",ExtraHtmlBackground).css("text-shadow", "0 0 5px #000");   
        }
    }
    function ExtraHtmlBrdrFunc(){
        $("#ExtraHtmlBrdr-Picker, #ExtraHtmlBrdrOpacity").on("input change", function(){
            ExtraHtmlBrdrOpacityColor();
        })
        function ExtraHtmlBrdrOpacityColor(){
            var percentage = Math.floor($("#ExtraHtmlBrdrOpacity").val() * 100);
            $("#ExtraHtmlBrdrOpacity-label").text("Border Color "+ percentage + "%");
            var color = $('#ExtraHtmlBrdr-Picker').val();
            var alpha = $('#ExtraHtmlBrdrOpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            ExtraHtmlBrdr = rgbaColor;       
            $("#ExtraHtmlBackGround-Label").css("border","solid 1px "+ExtraHtmlBrdr).css("text-shadow", "0 0 5px #000");   
        }
    }

    var MoveOnlineBankSwitch;
    MoveOnlineBankSwitchFunc();
    function MoveOnlineBankSwitchFunc(){
        $("#MoveOnlineBankSwitch").on("change", function(){
            if ($(this).is(":checked")){
                MoveOnlineBankSwitch = true;
            }else{
                MoveOnlineBankSwitch = false;
            }
        });
    }

    var paymentLabelShow; 
    var paymentLabel;
    var paymentLabelColor;
    paymentLabelShowFunc();
    paymentLabelFunc();
    paymentLabelColorFunc();
    function paymentLabelShowFunc(){
        $("#paymentLabelSwitch").on("change", function(){
            if ($(this).is(":checked")){
                paymentLabelShow = true;
                $("#paymentLabel-Container").show();
            }else{
                paymentLabelShow = false;
                $("#paymentLabel-Container").hide();
            }
        });
    }
    function paymentLabelFunc(){
        $("#paymentLabel-Label").on("input change",function(){
            paymentLabel = $(this).val();
        });
    }
    function paymentLabelColorFunc(){
        $("#paymentLabel-Picker").on("input change", function(){
            $("#paymentLabel-Label").css("color", $(this).val());
            paymentLabelColor = $(this).val();
        });
    }

    var GcashSwitch;
    var GcashOutSwitch;
    var GcashQr;
    var GcashQrPrevFile;
    var GcashBG;
    var GcashBrdr;
    GcashSwitchFun();
    GcashOutSwitchFun();
    GcashQrFunc();
    GcashBGFunc();
    GcashBrdrFunc();
    function GcashSwitchFun(){
        $("#Gcash").on("change",function(){
            if ($(this).is(":checked")){
                GcashSwitch = true;
                $("#Gcash-Container").show();
            }else{
                GcashSwitch = false;
                $("#Gcash-Container").hide();
            }
        });
    }
    function GcashOutSwitchFun(){
        $("#GcashOut").on("change",function(){
            if ($(this).is(":checked")){
                GcashOutSwitch = true;
            }else{
                GcashOutSwitch = false;
            }
        });
    }
    function GcashQrCheckFunc(){
        if (!GcashQr){
            $("#GcashFileParent").attr('class', "ParentQR fa fa-qrcode");
            $("#GcashFilePreview").attr('src', '').hide();
            $("#GcashFileDisplay").html('<i class="fa fa-upload" aria-hidden="true"></i> Upload Gcash Qr');
        }else{
            $("#GcashFileParent").attr('class', "ParentQR");
            $("#GcashFilePreview").attr('src', backUpFile+GcashQr+TimeStamp).show();
            $("#GcashFileDisplay").html('<i class="fa fa-upload" aria-hidden="true"></i>' + " " + GcashQr);
        }
    }
    function GcashQrFunc(){
        $("#GcashFile").on(" change", function(event) {
            handleFileSelection(event, "#GcashFile");
        });

        $("#GcashFileDisplay").on("click", function() {
            $("#GcashFile").trigger("click");
        });
    }
    function GcashBGFunc(){
        $("#GcashBG-Picker, #GcashOpacity").on("input change", function(){   
            GcashBGOpacityColor();
        });
        function GcashBGOpacityColor(){
            var percentage = Math.floor($("#GcashOpacity").val() * 100);
            $("#GcashOpacity-label").text("Background Color "+percentage + "%");
            var color = $('#GcashBG-Picker').val();
            var alpha = $('#GcashOpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            GcashBG = rgbaColor;       
            $("#GcashBtn").css("background",GcashBG).css("text-shadow", "0 0 5px #000");  
        }
    }
    function GcashBrdrFunc(){
        $("#GcashBRDR-Picker, #GcashBRDROpacity").on("input change", function(){   
            GcashBrdrOpacityColor();
        });

        function GcashBrdrOpacityColor(){
            var percentage = Math.floor($("#GcashBRDROpacity").val() * 100);
            $("#GcashBRDROpacity-label").text("Border Color "+percentage + "%");
            var color = $('#GcashBRDR-Picker').val();
            var alpha = $('#GcashBRDROpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            GcashBrdr = rgbaColor;       
            $("#GcashBtn").css("border", "solid 1px "+ GcashBrdr ).css("text-shadow", "0 0 5px #000");   
        }
    }

    var MayaSwitch;
    var MayaOutSwitch;
    var MayaQr;
    var MayaQrPrevFile;
    var MayaBG;
    var MayaBrdr;
    MayaSwitchFunc();
    MayaOutSwitchFunc();
    MayaQrFunc();
    MayaBGFunc();
    MayaBrdrFunc();
    function MayaSwitchFunc(){
        $("#Maya").on("change",function(){
            if ($(this).is(":checked")){
                MayaSwitch = true;
                $("#Maya-Container").show();
            }else{
                MayaSwitch = false;
                $("#Maya-Container").hide();
            }
        });
    }
    function MayaOutSwitchFunc(){
        $("#MayaOut").on("change",function(){
            if ($(this).is(":checked")){
                MayaOutSwitch = true;
            }else{
                MayaOutSwitch = false;
            }
        });
    }
    function MayaQrCheckFunc(){
        if (!MayaQr){
            $("#MayaFileParent").attr('class', "ParentQR fa fa-qrcode");
            $("#MayaFilePreview").attr('src', '').hide();
            $("#MayaFileDisplay").html('<i class="fa fa-upload" aria-hidden="true"></i> Upload Maya Qr');
        }else{
            $("#MayaFileParent").attr('class', "ParentQR");
            $("#MayaFilePreview").attr('src', backUpFile+MayaQr+TimeStamp).show();
            $("#MayaFileDisplay").html('<i class="fa fa-upload" aria-hidden="true"></i>' + " " + MayaQr);
        }
    }
    function MayaQrFunc(){
        $("#MayaFile").on(" change", function(event) {
            handleFileSelection(event, "#MayaFile");
        });

        $("#MayaFileDisplay").on("click", function() {
            $("#MayaFile").trigger("click");
        });
    }
    function MayaBGFunc(){
        $("#MayaBG-Picker, #MayaOpacity").on("input change", function(){   
            MayaBGOpacityColor();
        });
        function MayaBGOpacityColor(){
            var percentage = Math.floor($("#MayaOpacity").val() * 100);
            $("#MayaOpacity-label").text("Background Color "+percentage + "%");
            var color = $('#MayaBG-Picker').val();
            var alpha = $('#MayaOpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            MayaBG = rgbaColor;       
            $("#MayaBtn").css("background",MayaBG).css("text-shadow", "0 0 5px #000");   
        }
    }
    function MayaBrdrFunc(){
        $("#MayaBRDR-Picker, #MayaBRDROpacity").on("input change", function(){   
            MayaBrdrOpacityColor();
        });

        function MayaBrdrOpacityColor(){
            var percentage = Math.floor($("#MayaBRDROpacity").val() * 100);
            $("#MayaBRDROpacity-label").text("Border Color "+percentage + "%");
            var color = $('#MayaBRDR-Picker').val();
            var alpha = $('#MayaBRDROpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            MayaBrdr = rgbaColor;       
            $("#MayaBtn").css("border", "solid 1px "+ MayaBrdr ).css("text-shadow", "0 0 5px #000");   
        }
    }

    var BPISwitch;
    var BPIOutSwitch;
    var BPIQr;
    var BPIQrPrevFile;
    var BPIBG;
    var BPIBrdr;
    BPISwitchFunc();
    BPIOutSwitchFunc();
    BPIQrFunc();
    BPIBGFunc();
    BPIBrdrFunc();
    function BPISwitchFunc(){
        $("#BPI").on("change",function(){
            if ($(this).is(":checked")){
                BPISwitch = true;
                $("#BPI-Container").show();
            }else{
                BPISwitch = false;
                $("#BPI-Container").hide();
            }
        });
    }
    function BPIOutSwitchFunc(){
        $("#BPIOut").on("change",function(){
            if ($(this).is(":checked")){
                BPIOutSwitch = true;
            }else{
                BPIOutSwitch = false;
            }
        });
    }
    function BPIQrCheckFunc(){
        if (!BPIQr){
            $("#BPIFileParent").attr('class', "ParentQR fa fa-qrcode");
            $("#BPIFilePreview").attr('src', '').hide();
            $("#BPIFileDisplay").html('<i class="fa fa-upload" aria-hidden="true"></i> Upload BPI Qr');
        }else{
            $("#BPIFileParent").attr('class', "ParentQR");
            $("#BPIFilePreview").attr('src', backUpFile+BPIQr+TimeStamp).show();
            $("#BPIFileDisplay").html('<i class="fa fa-upload" aria-hidden="true"></i>' + " " + BPIQr);
        }
    }
    function BPIQrFunc(){
        $("#BPIFile").on(" change", function(event) {
            handleFileSelection(event, "#BPIFile");
        });

        $("#BPIFileDisplay").on("click", function() {
            $("#BPIFile").trigger("click");
        });
    }
    function BPIBGFunc(){
        $("#BPIBG-Picker, #BPIOpacity").on("input change", function(){   
            BPIBGOpacityColor();
        });
        function BPIBGOpacityColor(){
            var percentage = Math.floor($("#BPIOpacity").val() * 100);
            $("#BPIOpacity-label").text("Background Color "+percentage + "%");
            var color = $('#BPIBG-Picker').val();
            var alpha = $('#BPIOpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            BPIBG = rgbaColor;    
            $("#BPIBtn").css("background",BPIBG).css("text-shadow", "0 0 5px #000");      
        }
    }
    function BPIBrdrFunc(){
        $("#BPIBRDR-Picker, #BPIBRDROpacity").on("input change", function(){   
            BPIBrdrOpacityColor();
        });

        function BPIBrdrOpacityColor(){
            var percentage = Math.floor($("#BPIBRDROpacity").val() * 100);
            $("#BPIBRDROpacity-label").text("Border Color "+percentage + "%");
            var color = $('#BPIBRDR-Picker').val();
            var alpha = $('#BPIBRDROpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            BPIBrdr = rgbaColor;       
            $("#BPIBtn").css("border", "solid 1px "+ BPIBrdr ).css("text-shadow", "0 0 5px #000");   
        }
    }

    var SpaySwitch;
    var SpayOutSwitch;
    var SpayQr;
    var SpayQrPrevFile;
    var SpayBG;
    var SpayBrdr;
    SpaySwitchFunc();
    SpayOutSwitchFunc();
    SpayQrFunc();
    SpayBGFunc();
    SpayBrdrFunc();
    function SpaySwitchFunc(){
        $("#Spay").on("change",function(){
            if ($(this).is(":checked")){
                SpaySwitch = true;
                $("#Spay-Container").show();
            }else{
                SpaySwitch = false;
                $("#Spay-Container").hide();
            }
        });
    }
    function SpayOutSwitchFunc(){
        $("#SpayOut").on("change",function(){
            if ($(this).is(":checked")){
                SpayOutSwitch = true;
            }else{
                SpayOutSwitch = false;
            }
        });
    }
    function SpayQrCheckFunc(){
        if (!SpayQr){
            $("#SpayFileParent").attr('class', "ParentQR fa fa-qrcode");
            $("#SpayFilePreview").attr('src', '').hide();
            $("#SpayFileDisplay").html('<i class="fa fa-upload" aria-hidden="true"></i> Upload Spay Qr');
        }else{
            $("#SpayFileParent").attr('class', "ParentQR");
            $("#SpayFilePreview").attr('src', backUpFile+SpayQr+TimeStamp).show();
            $("#SpayFileDisplay").html('<i class="fa fa-upload" aria-hidden="true"></i>' + " " + SpayQr);
        }
    }
    function SpayQrFunc(){
        $("#SpayFile").on(" change", function(event) {
            handleFileSelection(event, "#SpayFile");
        });

        $("#SpayFileDisplay").on("click", function() {
            $("#SpayFile").trigger("click");
        });
    }
    function SpayBGFunc(){
        $("#SpayBG-Picker, #SpayOpacity").on("input change", function(){   
            SpayBGOpacityColor();
        });
        function SpayBGOpacityColor(){
            var percentage = Math.floor($("#SpayOpacity").val() * 100);
            $("#SpayOpacity-label").text("Background Color "+ percentage + "%");
            var color = $('#SpayBG-Picker').val();
            var alpha = $('#SpayOpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            SpayBG = rgbaColor;   
            $("#SpayBtn").css("background",SpayBG).css("text-shadow", "0 0 5px #000");       
        }
    }
    function SpayBrdrFunc(){
        $("#SpayBRDR-Picker, #SpayBRDROpacity").on("input change", function(){   
            SpayBrdrOpacityColor();
        });

        function SpayBrdrOpacityColor(){
            var percentage = Math.floor($("#SpayBRDROpacity").val() * 100);
            $("#SpayBRDROpacity-label").text("Border Color "+ percentage + "%");
            var color = $('#SpayBRDR-Picker').val();
            var alpha = $('#SpayBRDROpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            SpayBrdr = rgbaColor;       
            $("#SpayBtn").css("border", "solid 1px "+ SpayBrdr ).css("text-shadow", "0 0 5px #000");   
        }
    }

    var QRPHSwitch;
    var QRPHOutSwitch;
    var QRPHQr;
    var QRPHQrPrevFile;
    var QRPHBG;
    var QRPHBrdr;
    QRPHSwitchFunc();
    QRPHOutSwitchFunc();
    QRPHQrFunc();
    QRPHBGFunc();
    QRPHBrdrFunc();
    function QRPHSwitchFunc(){
        $("#QRPH").on("change",function(){
            if ($(this).is(":checked")){
                QRPHSwitch = true;
                $("#QRPH-Container").show();
            }else{
                QRPHSwitch = false;
                $("#QRPH-Container").hide();
            }
        });
    }
    function QRPHOutSwitchFunc(){
        $("#QRPHOut").on("change",function(){
            if ($(this).is(":checked")){
                QRPHOutSwitch = true;
            }else{
                QRPHOutSwitch = false;
            }
        });
    }
    function QRPHQrCheckFunc(){
        if (!QRPHQr){
            $("#QRPHFileParent").attr('class', "ParentQR fa fa-qrcode");
            $("#QRPHFilePreview").attr('src', '').hide();
            $("#QRPHFileDisplay").html('<i class="fa fa-upload" aria-hidden="true"></i> Upload QRPH Qr');
        }else{
            $("#QRPHFileParent").attr('class', "ParentQR");
            $("#QRPHFilePreview").attr('src', backUpFile+QRPHQr+TimeStamp).show();
            $("#QRPHFileDisplay").html('<i class="fa fa-upload" aria-hidden="true"></i>' + " " + QRPHQr);
        }
    }
    function QRPHQrFunc(){    
        $("#QRPHFile").on(" change", function(event) {
            handleFileSelection(event, "#QRPHFile");
        });

        $("#QRPHFileDisplay").on("click", function() {
            $("#QRPHFile").trigger("click");
        });
    }
    function QRPHBGFunc(){
        $("#QRPHBG-Picker, #QRPHOpacity").on("input change change", function(){      
            QRPHBGOpacityColor();
        });
        function QRPHBGOpacityColor(){
            var percentage = Math.floor($("#QRPHOpacity").val() * 100);
            $("#QRPHOpacity-label").text("Background Color "+ percentage + "%");
            var color = $('#QRPHBG-Picker').val();
            var alpha = $('#QRPHOpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            QRPHBG = rgbaColor;    
            $("#QRPHBtn").css("background",QRPHBG).css("text-shadow", "0 0 5px #000");  
        }
    }
    function QRPHBrdrFunc(){
        $("#QRPHBRDR-Picker, #QRPHBRDROpacity").on("input change", function(){   
            QRPHBrdrOpacityColor();
        });

        function QRPHBrdrOpacityColor(){
            var percentage = Math.floor($("#QRPHBRDROpacity").val() * 100);
            $("#QRPHBRDROpacity-label").text("Border Color "+ percentage + "%");
            var color = $('#QRPHBRDR-Picker').val();
            var alpha = $('#QRPHBRDROpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            QRPHBrdr = rgbaColor;       
            $("#QRPHBtn").css("border", "solid 1px "+ QRPHBrdr ).css("text-shadow", "0 0 5px #000");   
        }
    }

    var OtherBankSwitch;
    var OtherBankOutSwitch;
    var OtherBankLogo;
    var OtherBankLogoPrevFile;
    var OtherBankQr;
    var OtherBankQrPrevFile;
    var OtherBankBG;
    var OtherBankBrdr;
    OtherBankSwitchFunc();
    OtherBankOutSwitchFunc();
    OtherBankLogoFunc();
    OtherBankQrFunc();
    OtherBankBGFunc();
    OtherBankBrdrFunc();
    function OtherBankSwitchFunc(){
        $("#OtherBank").on("change",function(){
            if ($(this).is(":checked")){
                OtherBankSwitch = true;
                $("#OtherBank-Container").show();
            }else{
                OtherBankSwitch = false;
                $("#OtherBank-Container").hide();
            }
        });
    }
    function OtherBankOutSwitchFunc(){
        $("#OtherBankOut").on("change",function(){
            if ($(this).is(":checked")){
                OtherBankOutSwitch = true;
            }else{
                OtherBankOutSwitch = false;
            }
        });
    }
    function OtherBankLogoCheckFunc(){
        if (!OtherBankLogo){
            $("#OtherBankLogoBtn .img-btn").attr('src', '').hide();
            $("#OtherBankLogoDisplay").html('<i class="fa fa-upload" aria-hidden="true"></i> Upload Other Bank Logo');
        }else{
            $("#OtherBankLogoBtn .img-btn").attr('src', backUpFile+OtherBankLogo+TimeStamp).show();
            $("#OtherBankLogoDisplay").html('<i class="fa fa-upload" aria-hidden="true"></i>' + " " + OtherBankLogo);
        }
    }
    function OtherBankLogoFunc(){
        $("#OtherBankLogo").on(" change", function(event) {
            handleFileSelection(event, "#OtherBankLogo");
        });

        $("#OtherBankLogoDisplay").on("click", function() {
            $("#OtherBankLogo").trigger("click");
        });
    }
    function OtherBankQrCheckFunc(){
        if (!OtherBankQr){
            $("#OtherBankFileParent").attr('class', "ParentQR fa fa-qrcode");
            $("#OtherBankFilePreview").attr('src', '').hide();
            $("#OtherBankFileDisplay").html('<i class="fa fa-upload" aria-hidden="true"></i> Upload Other Bank Qr');
        }else{
            $("#OtherBankFileParent").attr('class', "ParentQR");
            $("#OtherBankFilePreview").attr('src', backUpFile+OtherBankQr+TimeStamp).show();
            $("#OtherBankFileDisplay").html('<i class="fa fa-upload" aria-hidden="true"></i>' + " " + OtherBankQr);
        }
    }
    function OtherBankQrFunc(){  
        $("#OtherBankFile").on(" change", function(event) {
            handleFileSelection(event, "#OtherBankFile");
        });

        $("#OtherBankFileDisplay").on("click", function() {
            $("#OtherBankFile").trigger("click");
        });
    }
    function OtherBankBGFunc(){
        $("#OtherBankBG-Picker, #OtherBankOpacity").on("input change change", function(){   
            OtherBankBGOpacityColor();
        });
        function OtherBankBGOpacityColor(){
            var percentage = Math.floor($("#OtherBankOpacity").val() * 100);
            $("#OtherBankOpacity-label").text("Background Color "+ percentage + "%");
            var color = $('#OtherBankBG-Picker').val();
            var alpha = $('#OtherBankOpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            OtherBankBG = rgbaColor;   
            $("#OtherBankLogoBtn").css("background",OtherBankBG).css("text-shadow", "0 0 5px #000");       
        }
    }
    function OtherBankBrdrFunc(){
        $("#OtherBankBRDR-Picker, #OtherBankBRDROpacity").on("input change", function(){   
            OtherBankBrdrOpacityColor();
        });

        function OtherBankBrdrOpacityColor(){
            var percentage = Math.floor($("#OtherBankBRDROpacity").val() * 100);
            $("#OtherBankBRDROpacity-label").text("Border Color "+ percentage + "%");
            var color = $('#OtherBankBRDR-Picker').val();
            var alpha = $('#OtherBankBRDROpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            OtherBankBrdr = rgbaColor;       
            $("#OtherBankLogoBtn").css("border", "solid 1px "+ OtherBankBrdr ).css("text-shadow", "0 0 5px #000");   
        }
    }

    var PromoShow;
    var PromoToBtn;
    var PromoCount;
    PromoCountFunc();
    PromoToBtnFunc();
    PromoShowFunc();
    function PromoShowFunc(){
        $("#PromoPlanSwitch").on("change",function(){
            if ($(this).is(":checked")){
                PromoShow = true;
                $("#PromoPlan-Container").show();
            }else{
                PromoShow = false;
                $("#PromoPlan-Container").hide();
            }
        });
    }
    function PromoToBtnFunc(){
        $("#PromoToBtnSwitch").on("change",function(){
            if ($(this).is(":checked")){
                PromoToBtn = true;
            }else{
                PromoToBtn = false;
            }
        });
    }
    function PromoCountFunc(){
        $("#PromoPlanCount").on("change", function(){
            if ($(this).val() == "PromoPlan1"){
                PromoCount = "1";
                $("#PromoPlan1-Container").show();
                $("#PromoPlan2-Container,#PromoPlan3-Container,#PromoPlan4-Container,#PromoPlan5-Container").hide();
            }else if ($(this).val() == "PromoPlan2"){
                PromoCount = "2";
                $("#PromoPlan1-Container,#PromoPlan2-Container").show();
                $("#PromoPlan3-Container,#PromoPlan4-Container,#PromoPlan5-Container").hide();
            }else if ($(this).val() == "PromoPlan3"){
                PromoCount = "3";
                $("#PromoPlan1-Container,#PromoPlan2-Container,#PromoPlan3-Container").show();
                $("#PromoPlan4-Container,#PromoPlan5-Container").hide();
            }else if ($(this).val() == "PromoPlan4"){
                PromoCount = "4";
                $("#PromoPlan1-Container,#PromoPlan2-Container,#PromoPlan3-Container,#PromoPlan4-Container").show();
                $("#PromoPlan5-Container").hide();
            }else if ($(this).val() == "PromoPlan5"){
                PromoCount = "5";
                $("#PromoPlan1-Container,#PromoPlan2-Container,#PromoPlan3-Container,#PromoPlan4-Container,#PromoPlan5-Container").show();
            }
        })
    }
    
    var PromoPlan1;
    var PromoPlan1Color;
    var PromoSpeed1;
    var PromoSpeed1Color;
    var PromoDescription1;
    var PromoDescription1Color;
    PromoPlan1Func();
    PromoPlan1ColorFunc();
    PromoSpeed1Func();
    PromoSpeed1ColorFunc();
    PromoDescription1Func();
    PromoDescription1ColorFunc();
    function PromoPlan1Func(){
        $("#PromoPlan1-Name").on("input change",function(){
            PromoPlan1 = $(this).val();
        });
    }
    function PromoPlan1ColorFunc(){
        $("#PromoPlan1-Name-Picker").on("input change", function(){
            $("#PromoPlan1-Name").css("color", $(this).val());
            PromoPlan1Color = $(this).val();
        });
    }
    function PromoSpeed1Func(){
        $("#PromoPlan1-Speed").on("input change",function(){
            PromoSpeed1 = $(this).val();
        });
    }
    function PromoSpeed1ColorFunc(){
        $("#PromoPlan1-Speed-Picker").on("input change", function(){
            $("#PromoPlan1-Speed").css("color", $(this).val());
            PromoSpeed1Color = $(this).val();
        });
    }
    function PromoDescription1Func(){
        $("#PromoPlan1-Description").on("input change",function(){
            PromoDescription1 = $(this).val();
        });
    }
    function PromoDescription1ColorFunc(){
        $("#PromoPlan1-Description-Picker").on("input change", function(){
            $("#PromoPlan1-Description").css("color", $(this).val());
            PromoDescription1Color = $(this).val();
        });
    }

    var PromoPlan2;
    var PromoPlan2Color;
    var PromoSpeed2;
    var PromoSpeed2Color;
    var PromoDescription2;
    var PromoDescription2Color;
    PromoPlan2Func();
    PromoPlan2ColorFunc();
    PromoSpeed2Func();
    PromoSpeed2ColorFunc();
    PromoDescription2Func();
    PromoDescription2ColorFunc();
    function PromoPlan2Func(){
        $("#PromoPlan2-Name").on("input change",function(){
            PromoPlan2 = $(this).val();
        });
    }
    function PromoPlan2ColorFunc(){
        $("#PromoPlan2-Name-Picker").on("input change", function(){
            $("#PromoPlan2-Name").css("color", $(this).val());
            PromoPlan2Color = $(this).val();
        });
    }
    function PromoSpeed2Func(){
        $("#PromoPlan2-Speed").on("input change",function(){
            PromoSpeed2 = $(this).val();
        });
    }
    function PromoSpeed2ColorFunc(){
        $("#PromoPlan2-Speed-Picker").on("input change", function(){
            $("#PromoPlan2-Speed").css("color", $(this).val());
            PromoSpeed2Color = $(this).val();
        });
    }
    function PromoDescription2Func(){
        $("#PromoPlan2-Description").on("input change",function(){
            PromoDescription2 = $(this).val();
        });
    }
    function PromoDescription2ColorFunc(){
        $("#PromoPlan2-Description-Picker").on("input change", function(){
            $("#PromoPlan2-Description").css("color", $(this).val());
            PromoDescription2Color = $(this).val();
        });
    }

    var PromoPlan3;
    var PromoPlan3Color;
    var PromoSpeed3;
    var PromoSpeed3Color;
    var PromoDescription3;
    var PromoDescription3Color;
    PromoPlan3Func();
    PromoPlan3ColorFunc();
    PromoSpeed3Func();
    PromoSpeed3ColorFunc();
    PromoDescription3Func();
    PromoDescription3ColorFunc();
    function PromoPlan3Func(){
        $("#PromoPlan3-Name").on("input change",function(){
            PromoPlan3 = $(this).val();
        });
    }
    function PromoPlan3ColorFunc(){
        $("#PromoPlan3-Name-Picker").on("input change", function(){
            $("#PromoPlan3-Name").css("color", $(this).val());
            PromoPlan3Color = $(this).val();
        });
    }
    function PromoSpeed3Func(){
        $("#PromoPlan3-Speed").on("input change",function(){
            PromoSpeed3 = $(this).val();
        });
    }
    function PromoSpeed3ColorFunc(){
        $("#PromoPlan3-Speed-Picker").on("input change", function(){
            $("#PromoPlan3-Speed").css("color", $(this).val());
            PromoSpeed3Color = $(this).val();
        });
    }
    function PromoDescription3Func(){
        $("#PromoPlan3-Description").on("input change",function(){
            PromoDescription3 = $(this).val();
        });
    }
    function PromoDescription3ColorFunc(){
        $("#PromoPlan3-Description-Picker").on("input change", function(){
            $("#PromoPlan3-Description").css("color", $(this).val());
            PromoDescription3Color = $(this).val();
        });
    }

    var PromoPlan4;
    var PromoPlan4Color;
    var PromoSpeed4;
    var PromoSpeed4Color;
    var PromoDescription4;
    var PromoDescription4Color;
    PromoPlan4Func();
    PromoPlan4ColorFunc();
    PromoSpeed4Func();
    PromoSpeed4ColorFunc();
    PromoDescription4Func();
    PromoDescription4ColorFunc();
    function PromoPlan4Func(){
        $("#PromoPlan4-Name").on("input change",function(){
            PromoPlan4 = $(this).val();
        });
    }
    function PromoPlan4ColorFunc(){
        $("#PromoPlan4-Name-Picker").on("input change", function(){
            $("#PromoPlan4-Name").css("color", $(this).val());
            PromoPlan4Color = $(this).val();
        });
    }
    function PromoSpeed4Func(){
        $("#PromoPlan4-Speed").on("input change",function(){
            PromoSpeed4 = $(this).val();
        });
    }
    function PromoSpeed4ColorFunc(){
        $("#PromoPlan4-Speed-Picker").on("input change", function(){
            $("#PromoPlan4-Speed").css("color", $(this).val());
            PromoSpeed4Color = $(this).val();
        });
    }
    function PromoDescription4Func(){
        $("#PromoPlan4-Description").on("input change",function(){
            PromoDescription4 = $(this).val();
        });
    }
    function PromoDescription4ColorFunc(){
        $("#PromoPlan4-Description-Picker").on("input change", function(){
            $("#PromoPlan4-Description").css("color", $(this).val());
            PromoDescription4Color = $(this).val();
        });
    }

    var PromoPlan5;
    var PromoPlan5Color;
    var PromoSpeed5;
    var PromoSpeed5Color;
    var PromoDescription5;
    var PromoDescription5Color;
    PromoPlan5Func();
    PromoPlan5ColorFunc();
    PromoSpeed5Func();
    PromoSpeed5ColorFunc();
    PromoDescription5Func();
    PromoDescription5ColorFunc();
    function PromoPlan5Func(){
        $("#PromoPlan5-Name").on("input change",function(){
            PromoPlan5 = $(this).val();
        });
    }
    function PromoPlan5ColorFunc(){
        $("#PromoPlan5-Name-Picker").on("input change", function(){
            $("#PromoPlan5-Name").css("color", $(this).val());
            PromoPlan5Color = $(this).val();
        });
    }
    function PromoSpeed5Func(){
        $("#PromoPlan5-Speed").on("input change",function(){
            PromoSpeed5 = $(this).val();
        });
    }
    function PromoSpeed5ColorFunc(){
        $("#PromoPlan5-Speed-Picker").on("input change", function(){
            $("#PromoPlan5-Speed").css("color", $(this).val());
            PromoSpeed5Color = $(this).val();
        });
    }
    function PromoDescription5Func(){
        $("#PromoPlan5-Description").on("input change",function(){
            PromoDescription5 = $(this).val();
        });
    }
    function PromoDescription5ColorFunc(){
        $("#PromoPlan5-Description-Picker").on("input change", function(){
            $("#PromoPlan5-Description").css("color", $(this).val());
            PromoDescription5Color = $(this).val();
        });
    }

    var PromoBtnList;
    var PromoBtnBrdr;
    var PromoBtnBg;
    var PromoBtnColor;
    PromoBtnBrdrFunc();
    PromoBtnBgFunc();
    PromoBtnColorFunc();
    PromoBtnListFunc();
    function PromoBtnListFunc(){
        $("#PromoPlan1-Name, #PromoPlan2-Name, #PromoPlan3-Name, #PromoPlan4-Name, #PromoPlan5-Name, #PromoPlanCount").on("input change", function(){
            PromoBtnList = PromoPlan1 +","+ PromoPlan2 +","+ PromoPlan3 +","+ PromoPlan4 +","+ PromoPlan5;
            var promoArray = PromoBtnList.split(',').map(function(item) {
                return item.trim();
            });
            var select = document.getElementById('PromoPlanBtn');

            while (select.firstChild) {
                select.removeChild(select.firstChild);
            }

            for (var i = 0; i < parseInt(PromoCount); i++) {
                var option = document.createElement('option');
                option.text = promoArray[i];
                option.value = 'Promo' + (i + 1);
                select.appendChild(option);
            }
        })
    }
    function PromoBtnBrdrFunc(){
        $("#PromoPlanBtnBrdr-Picker, #PromoPlanBtnBrdrOpacity").on("input change", function(){
            PromoBtnBrdrOpacityColor();
        })
        function PromoBtnBrdrOpacityColor(){
            var percentage = Math.floor($("#PromoPlanBtnBrdrOpacity").val() * 100);
            $("#PromoPlanBtnBrdrOpacity-label").text("Border Color "+ percentage + "%");
            var color = $('#PromoPlanBtnBrdr-Picker').val();
            var alpha = $('#PromoPlanBtnBrdrOpacity').val();
            PromoBtnBrdrcolor = color;
            PromoBtnBrdralpha = alpha;
            var rgbaColor = hexToRgba(color, alpha);
            PromoBtnBrdr = rgbaColor;       
            $("#PromoPlanBtn").css("border","solid 1px "+PromoBtnBrdr);   
        }
    }
    function PromoBtnBgFunc(){
        $("#PromoPlanBtnBg-Picker, #PromoPlanBtnBgOpacity").on("input change", function(){
            PromoBtnBgOpacityColor();
        })
        function PromoBtnBgOpacityColor(){
            var percentage = Math.floor($("#PromoPlanBtnBgOpacity").val() * 100);
            $("#PromoPlanBtnBgOpacity-label").text("Background Color "+ percentage + "%");
            var color = $('#PromoPlanBtnBg-Picker').val();
            var alpha = $('#PromoPlanBtnBgOpacity').val();
            PromoBtnBgcolor = color;
            PromoBtnBgalpha = alpha;
            var rgbaColor = hexToRgba(color, alpha);
            PromoBtnBg = rgbaColor;       
            $("#PromoPlanBtn").css("background",PromoBtnBg);   
        }
    }  
    function PromoBtnColorFunc(){
        $("#PromoPlanBtn-Picker").on("input change", function(){
            $("#PromoPlanBtn").css("color", $(this).val());
            PromoBtnColor = $(this).val();
        });
    }

    var promoLabelShow;
    var promoLabel;
    var promoLabelColor;
    promoLabelShowFunc();
    promoLabelFunc();
    promoLabelColorFunc();
    function promoLabelShowFunc(){
        $("#promoLabelSwitch").on("change", function(){
            if ($(this).is(":checked")){
                promoLabelShow = true;
                $("#promoLabel-Container").show();
            }else{
                promoLabelShow = false;
                $("#promoLabel-Container").hide();
            }
        });
    }
    function promoLabelFunc(){
        $("#promoLabel-Label").on("input change",function(){
            promoLabel = $(this).val();
        });
    }
    function promoLabelColorFunc(){
        $("#promoLabel-Picker").on("input change", function(){
            $("#promoLabel-Label").css("color", $(this).val());
            promoLabelColor = $(this).val();
        });
    }

    var LoadedComplete = false;
    var ThemeSetup;
    var CustomBtn;
    CustomBtnFunc();
    function CustomBtnFunc(){
        $("#CustomBtnSwitch").on("change",function(){
            if ($(this).is(":checked")){
                CustomBtn = true;
                $('head').append('<style id="customBtn">#BtnSuccess, #BtnPrimary, #BtnDanger, #BtnWarning, #BtnInfo{height:38px!important;padding:5px;border-radius:0;clip-path:polygon(0 12px,12px 0,calc(100%) 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 calc(100%));-webkit-clip-path:polygon(0 12px,12px 0,calc(100%) 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 calc(100%));position:relative;border:none!important}#BtnSuccess::before,#BtnPrimary::before, #BtnDanger::before, #BtnWarning::before, #BtnInfo::before{content:"";position:absolute;top:0;left:0;right:0;bottom:0;clip-path:polygon(0 12px,12px 0,calc(100%) 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 calc(100%),0 12px,0.05em calc(12px + 0.05em),0.05em calc(100% - 0.05em),calc(12px + 0.05em) calc(100% - 0.05em),calc(100% - 12px - 0.05em) calc(100% - 0.05em),calc(100% - 0.05em) calc(100% - 12px - 0.05em),calc(100% - 0.05em) calc(12px + 0.05em),calc(100% - 0.05em) 0.05em,calc(12px + 0.05em) 0.05em,0.05em calc(12px + 0.05em));-webkit-clip-path:polygon(0 12px,12px 0,calc(100%) 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 calc(100%),0 12px,0.05em calc(12px + 0.05em),0.05em calc(100% - 0.05em),calc(12px + 0.05em) calc(100% - 0.05em),calc(100% - 12px - 0.05em) calc(100% - 0.05em),calc(100% - 0.05em) calc(100% - 12px - 0.05em),calc(100% - 0.05em) calc(12px + 0.05em),calc(100% - 0.05em) 0.05em,calc(12px + 0.05em) 0.05em,0.05em calc(12px + 0.05em));box-sizing:border-box;pointer-events:none}</style>');
            }else{
                CustomBtn = false;
                $("#customBtn").remove();
            }

            if(LoadedComplete){
                if (!DefaultSetup && !ThemeSetup){
                    $("#BtnSuccessBrdr-Picker, #BtnSuccessBg-Picker,#BtnPrimaryBrdr-Picker, #BtnPrimaryBg-Picker,#BtnDangerBrdr-Picker, #BtnDangerBg-Picker,#BtnWarningBrdr-Picker, #BtnWarningBg-Picker,#BtnInfoBrdr-Picker, #BtnInfoBg-Picker").trigger("change");
                }
            }
        });
    }

    var BtnSuccessColor;
    var BtnSuccessBrdr;
    var BtnSuccessBg;
    BtnSuccessColorFunc();
    BtnSuccessBrdrFunc();
    BtnSuccessBgFunc();
    function BtnSuccessColorFunc(){
        $("#BtnSuccess-Picker").on("input change", function(){
            $("#BtnSuccess").css("color", $(this).val());
            BtnSuccessColor = $(this).val();
        });
    }
    function BtnSuccessBrdrFunc(){
        $("#BtnSuccessBrdr-Picker, #BtnSuccessBrdrOpacity").on("input change", function(){
            BtnSuccessBrdrOpacityColor();
        })
        function BtnSuccessBrdrOpacityColor(){
            var percentage = Math.floor($("#BtnSuccessBrdrOpacity").val() * 100);
            $("#BtnSuccessBrdrOpacity-label").text("Border Color "+ percentage + "%");
            var color = $('#BtnSuccessBrdr-Picker').val();
            var alpha = $('#BtnSuccessBrdrOpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            BtnSuccessBrdr = rgbaColor; 
            if (CustomBtn){
                $("#CustomBtnSuccessBrdr").remove();
                $('head').append('<style id="CustomBtnSuccessBrdr">#BtnSuccess::before{background: '+BtnSuccessBrdr+'}</style>');
            }else{
                $("#BtnSuccess").css("border","solid 1px "+BtnSuccessBrdr);   
            }            
        }
    }
    function BtnSuccessBgFunc(){
        $("#BtnSuccessBg-Picker, #BtnSuccessBgOpacity").on("input change", function(){
            BtnSuccessBgOpacityColor();
        })
        function BtnSuccessBgOpacityColor(){
            var percentage = Math.floor($("#BtnSuccessBgOpacity").val() * 100);
            $("#BtnSuccessBgOpacity-label").text("Background Color "+ percentage + "%");
            var color = $('#BtnSuccessBg-Picker').val();
            var alpha = $('#BtnSuccessBgOpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            BtnSuccessBg = rgbaColor; 
            $("#BtnSuccess").css("background",BtnSuccessBg);   
        }
    }

    var BtnPrimaryColor;
    var BtnPrimaryBrdr;
    var BtnPrimaryBg;
    BtnPrimaryColorFunc();
    BtnPrimaryBrdrFunc();
    BtnPrimaryBgFunc();
    function BtnPrimaryColorFunc(){
        $("#BtnPrimary-Picker").on("input change", function(){
            $("#BtnPrimary").css("color", $(this).val());
            BtnPrimaryColor = $(this).val();
        });
    }
    function BtnPrimaryBrdrFunc(){
        $("#BtnPrimaryBrdr-Picker, #BtnPrimaryBrdrOpacity").on("input change", function(){
            BtnPrimaryBrdrOpacityColor();
        })
        function BtnPrimaryBrdrOpacityColor(){
            var percentage = Math.floor($("#BtnPrimaryBrdrOpacity").val() * 100);
            $("#BtnPrimaryBrdrOpacity-label").text("Border Color "+ percentage + "%");
            var color = $('#BtnPrimaryBrdr-Picker').val();
            var alpha = $('#BtnPrimaryBrdrOpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            BtnPrimaryBrdr = rgbaColor; 
            if (CustomBtn){
                $("#CustomBtnPrimaryBrdr").remove();
                $('head').append('<style id="CustomBtnPrimaryBrdr">#BtnPrimary::before{background: '+BtnPrimaryBrdr+'}</style>');
            }else{
                $("#BtnPrimary").css("border","solid 1px "+BtnPrimaryBrdr);   
            }    
            
        }
    }
    function BtnPrimaryBgFunc(){
        $("#BtnPrimaryBg-Picker, #BtnPrimaryBgOpacity").on("input change", function(){
            BtnPrimaryBgOpacityColor();
        })
        function BtnPrimaryBgOpacityColor(){
            var percentage = Math.floor($("#BtnPrimaryBgOpacity").val() * 100);
            $("#BtnPrimaryBgOpacity-label").text("Background Color "+ percentage + "%");
            var color = $('#BtnPrimaryBg-Picker').val();
            var alpha = $('#BtnPrimaryBgOpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            BtnPrimaryBg = rgbaColor; 
            $("#BtnPrimary").css("background",BtnPrimaryBg);   
        }
    }

    var BtnDangerColor;
    var BtnDangerBrdr;
    var BtnDangerBg;
    BtnDangerColorFunc();
    BtnDangerBrdrFunc();
    BtnDangerBgFunc();
    function BtnDangerColorFunc(){
        $("#BtnDanger-Picker").on("input change", function(){
            $("#BtnDanger").css("color", $(this).val());
            BtnDangerColor = $(this).val();
        });
    }
    function BtnDangerBrdrFunc(){
        $("#BtnDangerBrdr-Picker, #BtnDangerBrdrOpacity").on("input change", function(){
            BtnDangerBrdrOpacityColor();
        })
        function BtnDangerBrdrOpacityColor(){
            var percentage = Math.floor($("#BtnDangerBrdrOpacity").val() * 100);
            $("#BtnDangerBrdrOpacity-label").text("Border Color "+ percentage + "%");
            var color = $('#BtnDangerBrdr-Picker').val();
            var alpha = $('#BtnDangerBrdrOpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            BtnDangerBrdr = rgbaColor; 
            if (CustomBtn){
                $("#CustomBtnDangerBrdr").remove();
                $('head').append('<style id="CustomBtnDangerBrdr">#BtnDanger::before{background: '+BtnDangerBrdr+'}</style>');
            }else{
                $("#BtnDanger").css("border","solid 1px "+BtnDangerBrdr);   
            }    
            
        }
    }
    function BtnDangerBgFunc(){
        $("#BtnDangerBg-Picker, #BtnDangerBgOpacity").on("input change", function(){
            BtnDangerBgOpacityColor();
        })
        function BtnDangerBgOpacityColor(){
            var percentage = Math.floor($("#BtnDangerBgOpacity").val() * 100);
            $("#BtnDangerBgOpacity-label").text("Background Color "+ percentage + "%");
            var color = $('#BtnDangerBg-Picker').val();
            var alpha = $('#BtnDangerBgOpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            BtnDangerBg = rgbaColor; 
            $("#BtnDanger").css("background",BtnDangerBg);   
        }
    }

    var BtnWarningColor;
    var BtnWarningBrdr;
    var BtnWarningBg;
    BtnWarningColorFunc();
    BtnWarningBrdrFunc();
    BtnWarningBgFunc();
    function BtnWarningColorFunc(){
        $("#BtnWarning-Picker").on("input change", function(){
            $("#BtnWarning").css("color", $(this).val());
            BtnWarningColor = $(this).val();
        });
    }
    function BtnWarningBrdrFunc(){
        $("#BtnWarningBrdr-Picker, #BtnWarningBrdrOpacity").on("input change", function(){
            BtnWarningBrdrOpacityColor();
        })
        function BtnWarningBrdrOpacityColor(){
            var percentage = Math.floor($("#BtnWarningBrdrOpacity").val() * 100);
            $("#BtnWarningBrdrOpacity-label").text("Border Color "+ percentage + "%");
            var color = $('#BtnWarningBrdr-Picker').val();
            var alpha = $('#BtnWarningBrdrOpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            BtnWarningBrdr = rgbaColor; 
            if (CustomBtn){
                $("#CustomBtnWarningBrdr").remove();
                $('head').append('<style id="CustomBtnWarningBrdr">#BtnWarning::before{background: '+BtnWarningBrdr+'}</style>');
            }else{
                $("#BtnWarning").css("border","solid 1px "+BtnWarningBrdr);   
            }    
            
        }
    }
    function BtnWarningBgFunc(){
        $("#BtnWarningBg-Picker, #BtnWarningBgOpacity").on("input change", function(){
            BtnWarningBgOpacityColor();
        })
        function BtnWarningBgOpacityColor(){
            var percentage = Math.floor($("#BtnWarningBgOpacity").val() * 100);
            $("#BtnWarningBgOpacity-label").text("Background Color "+ percentage + "%");
            var color = $('#BtnWarningBg-Picker').val();
            var alpha = $('#BtnWarningBgOpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            BtnWarningBg = rgbaColor; 
            $("#BtnWarning").css("background",BtnWarningBg);   
        }
    }

    var BtnInfoColor;
    var BtnInfoBrdr;
    var BtnInfoBg;
    BtnInfoColorFunc();
    BtnInfoBrdrFunc();
    BtnInfoBgFunc();
    function BtnInfoColorFunc(){
        $("#BtnInfo-Picker").on("input change", function(){
            $("#BtnInfo").css("color", $(this).val());
            BtnInfoColor = $(this).val();
        });
    }
    function BtnInfoBrdrFunc(){
        $("#BtnInfoBrdr-Picker, #BtnInfoBrdrOpacity").on("input change", function(){
            BtnInfoBrdrOpacityColor();
        })
        function BtnInfoBrdrOpacityColor(){
            var percentage = Math.floor($("#BtnInfoBrdrOpacity").val() * 100);
            $("#BtnInfoBrdrOpacity-label").text("Border Color "+ percentage + "%");
            var color = $('#BtnInfoBrdr-Picker').val();
            var alpha = $('#BtnInfoBrdrOpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            BtnInfoBrdr = rgbaColor; 
            if (CustomBtn){
                $("#CustomBtnInfoBrdr").remove();
                $('head').append('<style id="CustomBtnInfoBrdr">#BtnInfo::before{background: '+BtnInfoBrdr+'}</style>');
            }else{
                $("#BtnInfo").css("border","solid 1px "+BtnInfoBrdr);   
            }    
            
        }
    }
    function BtnInfoBgFunc(){
        $("#BtnInfoBg-Picker, #BtnInfoBgOpacity").on("input change", function(){
            BtnInfoBgOpacityColor();
        })
        function BtnInfoBgOpacityColor(){
            var percentage = Math.floor($("#BtnInfoBgOpacity").val() * 100);
            $("#BtnInfoBgOpacity-label").text("Background Color "+ percentage + "%");
            var color = $('#BtnInfoBg-Picker').val();
            var alpha = $('#BtnInfoBgOpacity').val();
            var rgbaColor = hexToRgba(color, alpha);
            BtnInfoBg = rgbaColor; 
            $("#BtnInfo").css("background",BtnInfoBg);   
        }
    }

    function ExtractColorVarFunc(colorString, prefix) {
        var rgbaMatch = colorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d\.]+)?\)/);
        if (rgbaMatch) {
            var r = parseInt(rgbaMatch[1]);
            var g = parseInt(rgbaMatch[2]);
            var b = parseInt(rgbaMatch[3]);
            var a = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1;

            var hex = "#" + [r, g, b].map(x => {
                const hex = x.toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            }).join('');

            var opacityPercent = a * 100 / 100;

            var hexVarName = prefix + "ColorHex";
            var opacityVarName = prefix + "ColorOpacity";

            window[hexVarName] = hex;
            window[opacityVarName] = opacityPercent;

        } else {
            console.warn("Color string didn't match RGBA pattern:", colorString);
        }
    }
    function hexToRgba(hex, alpha) {
        let r = parseInt(hex.substring(1, 3), 16);
        let g = parseInt(hex.substring(3, 5), 16);
        let b = parseInt(hex.substring(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    var DefaultSetup;
    $.ajax({
        url: 'http://' + ipWEB + backUpFile+'ssg-config.js'+TimeStamp,
        method: 'GET',
        success: function() {
        RestoreBackUpConfig();
        },
        error: function() {
        DefaultConfig();
        }
    });

    var ShowIt = false;
    $("#PPPoE-Theme-ID").on("input change paste", function(){
        function rep(str) {return str.split(' ').join('');}
        var inputValue = $('#PPPoE-Theme-ID').val();
        cleanedValue = rep(inputValue);
        if (p2 !== undefined && p2 !== null && p2 !== '') {
            if (cleanedValue == p2){
                if (!ShowIt){
                    ShowIt = true;
                    $("#Theme-Config").after('<div id="BtnTheme" class="myspace-between" style="padding: 10px;"><button class="btn w-50 my-btnA"id=ApplyTheme>Apply Theme</button> <button class="btn w-50 my-btnB"id=ResetTheme>Reset Theme</button> <button class="btn w-50 my-btnC"id=RemoveTheme>Remove Theme</button></div>');
                    ClickButton();
                }
                $("#Theme-Config").show();
                ProceedApply = true;
            }else{
                ShowIt = false;
                $("#BtnTheme").remove();
                $("#Theme-Config").hide();
                ProceedApply = false;
            }
        }    
    });

    function ClickButton(){
        $("#ApplyTheme").on("click",function(){
            $.ajax({
                url: "https://raw.githubusercontent.com/SSGxFILES/me/refs/heads/main/ssg.ico",
                method: 'GET',
                timeout: 3000,
                success: function() {
                    if (ProceedApply){
                        uploadTrigger();
                        $('#ThemeProgress').modal('show');
                    }
                },
                error: function() {
                    if ($('#myToastError').length == 0){
                        $("body").append('<div class="toast" data-delay="2000" id="myToastError" style="position:absolute;top: 10%;right: 0;left: 0;margin: auto;padding: 5px;background: #080b12;border-color: #f64e4e;color: #f64e4e;">Internet Connection Required</div>');
                        $('#myToastError').toast('show');
                        $('#myToastError').on('hidden.bs.toast', function () {
                            $(this).remove();
                        });
                    }
                }
            });
        });
        $("#ResetTheme").on("click", function(){
            if (ProceedApply){
                DefaultConfig();
                if ($('#myToast').length == 0){
                    $("body").append('<div class="toast" data-delay="2000" id="myToast" style="position:absolute;top: 10%;right: 0;left: 0;margin: auto;padding: 5px;background: #080b12;border-color: #f6e84e;color: #f6e84e;">Theme reset to default.</div>');
                    $('#myToast').toast('show');
                    $('#myToast').on('hidden.bs.toast', function () {
                        $(this).remove();
                    });
                }
            }
        });
        $("#RemoveTheme").on("click", function(){
            if (ProceedApply){
                $('a[name*="![PPPoE]"]').trigger('click');
                $('button[type="remove"]').trigger('click');
                var checkInterval = setInterval(function() {
                    var removeBtn = $('button[title="REMOVE"]');
                    if (removeBtn.length && removeBtn.is(':visible')) {
                        removeBtn.trigger('click');
                        clearInterval(checkInterval);
                    }
                }, 100);
                if ($('button[type="remove"]').length === 0) {
                    $('button[title="REMOVE"]').parents().eq(5).addClass("hideme");
                    clearInterval(checkInterval);
                    
                }
                DefaultConfig();
            }  
        });
    }

    $("#TextInfoSettings, #PromoPlanSettings, #ExtraHtmlSettings").on("click",function(){
        var checkShow = setInterval(function() {
            if ($(".modal").hasClass("show")) {
                $("textarea").trigger("change");
                clearInterval(checkShow);
            }
        }, 100);
    });
    

    function RestoreBackUpConfig(){
        if (typeof DARK_LIGHT_SWITCH === 'undefined') {
            DarkLightSwitch = true;
        }else{
            DarkLightSwitch = DARK_LIGHT_SWITCH;
        }

        DefaultSetup = false;
        OnlinePayment = ENABLE_ONLINE_PAYMENT;

        LogoBanner = LOGOBANNER_ENABLE;
        LogoBannerHeight = LOGOBANNER_HEIGHT;
        LogoBannerFile = LOGOBANNER_FILE_NAME;
        LogoBannerPrevFile = LogoBannerFile;

        BrandTitleBackground = BRANDTITLE_BACKGROUND_COLOR;
        BrandTitleBrdr = BRANDTITLE_BORDER_COLOR;

        BrandTitle = BRAND_TITLE_SWITCH;
        BrandTitleText = BRAND_TITLE;
        BrandTitleFX = BRAND_TITLE_FX;
        BRAND_TITLE_COLOR = "#df4337, #4196c1, #13a59d, #E29E09, #fd7e14, #df4337";
        var Brandcolors = BRAND_TITLE_COLOR.split(',').map(Brandcolor => Brandcolor.trim());
        fx1BrandTitle = Brandcolors[0];
        fx2BrandTitle = Brandcolors[1];
        fx3BrandTitle = Brandcolors[2];
        fx4BrandTitle = Brandcolors[3];
        fx5BrandTitle = Brandcolors[4];
        fx6BrandTitle = Brandcolors[5];
            
        SubBrandTitle = SUBBRAND_TITLE_SWITCH;
        SubBrandTitleText = SUBBRAND_TITLE;
        SubBrandTitleFX = SUBBRAND_TITLE_FX;
        SUBBRAND_TITLE_COLOR  = "#df4337, #4196c1, #13a59d, #E29E09, #fd7e14, #df4337";
        var SubBrandcolors = SUBBRAND_TITLE_COLOR .split(',').map(SubBrandcolor => SubBrandcolor.trim());
        fx1SubBrandTitle = SubBrandcolors[0];
        fx2SubBrandTitle = SubBrandcolors[1];
        fx3SubBrandTitle = SubBrandcolors[2];
        fx4SubBrandTitle = SubBrandcolors[3];
        fx5SubBrandTitle = SubBrandcolors[4];
        fx6SubBrandTitle = SubBrandcolors[5];

        BGfx = BACKGROUND_ANIMATION;
        BGFxColor = BACKGROUND_ANIMATION_COLOR;

        CustomContainerSwitch = CUSTOM_BRDR;

        MainBgImage = BACKGROUND_IMAGE_ENABLE;
        MainBgImageFile = BACKGROUND_IMAGE;
        MainBgPrevFile = MainBgImageFile;
        MainBgColor = BACKGROUND_COLOR ;

        PortalBgImage = BODY_INFO_BACKGROUND_IMAGE_ENABLE;
        PortalBgImageFile = BODY_INFO_BACKGROUND_IMAGE;
        PortalBgPrevFile = PortalBgImageFile;
        PortalBgColor = BODY_INFO_BACKGROUND_COLOR ;
        PortalBgColorBorder = BODY_INFO_BORDER_COLOR;

        ModalBgImage = MODAL_BACKGROUND_IMAGE_ENABLE;
        ModalBgImageFile = MODAL_BACKGROUND_IMAGE;
        ModalBgPrevFile = ModalBgImageFile;
        ModalBgColor = MODAL_BACKGROUND_COLOR ;
        ModalBgColorBorder = MODAL_BORDER_COLOR;

        StatsShow = STATUS_SHOW;
        ActiveColor = STATUS_ACTIVE_COLOR;
        ExpiredColor = STATUS_EXPIRED_COLOR;
        statsLabel = STATUS_LABEL;
        statsLabelColor = STATUS_LABEL_COLOR;

        ExpDateShow = EXPIRATION_SHOW;
        ExpDateColor = EXPIRATION_COLOR;
        expLabel = EXPIRATION_LABEL;
        expLabelColor = EXPIRATION_LABEL_COLOR;

        AmountValShow = AMOUNT_SHOW;
        AmountValColor = AMOUNT_COLOR;
        amountLabel = AMOUNT_LABEL;
        amountLabelColor = AMOUNT_LABEL_COLOR;

        SpeedShow = SPEED_SHOW;
        SpeedColor = SPEED_COLOR;
        speedLabel = SPEED_LABEL;
        speedLabelColor = SPEED_LABEL_COLOR;

        IPShow = IP_SHOW;
        IPColor = IP_COLOR;
        ipLabel = IP_LABEL;
        ipLabelColor = IP_LABEL_COLOR;

        MACShow = MAC_SHOW;
        MACColor = MAC_COLOR;
        macLabel = MAC_LABEL;
        macLabelColor = MAC_LABEL_COLOR;     

        ActiveStatsShow = ACTIVE_STATUS_SHOW;
        ActiveStats = ACTIVE_STATUS;
        ActiveStatsColor = ACTIVE_STATUS_COLOR;

        activeTextInfoShow = ACTIVE_TEXT_INFO_SHOW;
        activeTextInfo = ACTIVE_TEXT_INFO;
        activeTextInfoColor = ACTIVE_TEXT_INFO_COLOR;

        ExpStatsShow = EXPIRED_STATUS_SHOW;
        ExpStats = EXPIRED_STATUS;
        ExpStatsColor = EXPIRED_STATUS_COLOR;

        expiredTextInfoShow = EXPIRED_TEXT_INFO_SHOW;
        expiredTextInfo = EXPIRED_TEXT_INFO;
        expiredTextInfoColor = EXPIRED_TEXT_INFO_COLOR;

        ssTextInfoShow = SCREENSHOT_NOTE_SHOW;
        ssTextInfo = SCREENSHOT_NOTE;
        ssTextInfoColor = SCREENSHOT_NOTE_COLOR;

        OwnerInfoShow = OWNER_INFO_SHOW;
        OwnerToBtn = OWNER_INFO_TO_BTN;
        MessengerLink = FB_MESSENGER_LINK;
        MessengerName = FB_NAME;
        MessengerColor = FB_NAME_COLOR;
        ContactNumber = CONTACT_NUMBER;
        ContactNumberColor = CONTACT_NUMBER_COLOR;
        EmailName = EMAIL;
        EmailColor = EMAIL_COLOR;
        LocationAdd = MYLOCATION;
        LocationAddColor = MYLOCATION_COLOR;

        ExtraHtmlCssSwitch = ADD_FOOTER_EXTRA_HTML;
        ExtraHtmlCssCode = FOOTER_CODE_EXTRA_HTML;
        ExtraHtmlBackground = FOOTER_BACKGROUND_COLOR;
        ExtraHtmlBrdr = FOOTER_BORDER_COLOR;

        MoveOnlineBankSwitch = BRING_OUT_PAYMENT_BUTTON;

        paymentLabelShow = PAYMENT_LABEL_SHOW;
        paymentLabel = PAYMENT_LABEL;
        paymentLabelColor = PAYMENT_LABEL_COLOR;

        GcashSwitch = ADD_GCASH_QR;
        if (typeof GCASH_QR_OUT === 'undefined') {
            GcashOutSwitch = false;
        }else{
            GcashOutSwitch = GCASH_QR_OUT;
        }
        GcashQr = GCASH_QR_FILE_NAME;
        GcashQrPrevFile = GcashQr;
        GcashBG = GCASH_BAKGROUND_COLOR;
        GcashBrdr = GCASH_BORDER_COLOR;

        MayaSwitch = ADD_PAYMAYA_QR;
        if (typeof MAYA_QR_OUT === 'undefined') {
            MayaOutSwitch = false;
        }else{
            MayaOutSwitch = MAYA_QR_OUT;
        }
        MayaQr = PAYMAYA_QR_FILE_NAME;
        MayaQrPrevFile = MayaQr;
        MayaBG = PAYMAYA_BAKGROUND_COLOR;
        MayaBrdr = PAYMAYA_BORDER_COLOR;

        BPISwitch = ADD_BPI_QR;
        if (typeof BPI_QR_OUT === 'undefined') {
            BPIOutSwitch = false;
        }else{
            BPIOutSwitch = BPI_QR_OUT;
        }
        BPIQr = BPI_QR_FILE_NAME;
        BPIQrPrevFile = BPIQr;
        BPIBG = BPI_BAKGROUND_COLOR;
        BPIBrdr = BPI_BORDER_COLOR;

        SpaySwitch = ADD_SHOPEEPAY_QR;
        if (typeof SPAY_QR_OUT === 'undefined') {
            SpayOutSwitch = false;
        }else{
            SpayOutSwitch = SPAY_QR_OUT;
        }
        SpayQr = SHOPEEPAY_QR_FILE_NAME;
        SpayQrPrevFile = SpayQr;
        SpayBG = SHOPEEPAY_BAKGROUND_COLOR;
        SpayBrdr = SHOPEEPAY_BORDER_COLOR;
        
        QRPHSwitch = ADD_QRPH_QR;
        if (typeof QRPH_QR_OUT === 'undefined') {
            QRPHOutSwitch = false;
        }else{
            QRPHOutSwitch = QRPH_QR_OUT;
        }
        QRPHQr = QRPH_QR_FILE_NAME;
        QRPHQrPrevFile = QRPHQr;  
        QRPHBG = QRPH_BAKGROUND_COLOR;
        QRPHBrdr = QRPH_BORDER_COLOR;

        OtherBankSwitch = ADD_OTHER_QR;
        if (typeof OTHER_QR_OUT === 'undefined') {
            OtherBankOutSwitch = false;
        }else{
            OtherBankOutSwitch = OTHER_QR_OUT;
        }
        OtherBankLogo = BTN_LOGO_FILE;
        OtherBankLogoPrevFile = OtherBankLogo;
        OtherBankQr = OTHER_QR_FILE_NAME;
        OtherBankQrPrevFile = OtherBankQr;
        OtherBankBG = OTHER_BAKGROUND_COLOR;
        OtherBankBrdr = OTHER_BORDER_COLOR;

        PromoShow = PROMO;
        PromoToBtn = PROMO_TO_BTN;
        PromoCount = PROMO_LIST_COUNT;

        PromoPlan1 = PROMO_PLAN1;
        PromoPlan1Color = PROMO_PLAN1_COLOR;
        PromoSpeed1 = PROMO_SPEED1;
        PromoSpeed1Color = PROMO_SPEED1_COLOR;
        PromoDescription1 = PROMO_DESCRIPTION1;
        PromoDescription1Color = PROMO_DESCRIPTION1_COLOR;

        PromoPlan2 = PROMO_PLAN2;
        PromoPlan2Color = PROMO_PLAN2_COLOR;
        PromoSpeed2 = PROMO_SPEED2;
        PromoSpeed2Color = PROMO_SPEED2_COLOR;
        PromoDescription2 = PROMO_DESCRIPTION2;
        PromoDescription2Color = PROMO_DESCRIPTION2_COLOR;

        PromoPlan3 = PROMO_PLAN3;
        PromoPlan3Color = PROMO_PLAN3_COLOR;
        PromoSpeed3 = PROMO_SPEED3;
        PromoSpeed3Color = PROMO_SPEED3_COLOR;
        PromoDescription3 = PROMO_DESCRIPTION3;
        PromoDescription3Color = PROMO_DESCRIPTION3_COLOR;

        PromoPlan4 = PROMO_PLAN4;
        PromoPlan4Color = PROMO_PLAN4_COLOR;
        PromoSpeed4 = PROMO_SPEED4;
        PromoSpeed4Color = PROMO_SPEED4_COLOR;
        PromoDescription4 = PROMO_DESCRIPTION4;
        PromoDescription4Color = PROMO_DESCRIPTION4_COLOR;

        PromoPlan5 = PROMO_PLAN5;
        PromoPlan5Color = PROMO_PLAN5_COLOR;
        PromoSpeed5 = PROMO_SPEED5;
        PromoSpeed5Color = PROMO_SPEED5_COLOR;
        PromoDescription5 = PROMO_DESCRIPTION5;
        PromoDescription5Color = PROMO_DESCRIPTION5_COLOR;

        PromoBtnList = PromoPlan1 + "," + PromoPlan2 + "," + PromoPlan3 + "," + PromoPlan4 + "," + PromoPlan5 ;
        PromoBtnBrdr = PROMO_BUTTON_BRDR;
        PromoBtnBg = PROMO_BUTTON_BG;
        PromoBtnColor = PROMO_BUTTON_COLOR;

        promoLabelShow = PROMO_LABEL_SHOW;
        promoLabel = PROMO_LABEL;
        promoLabelColor = PROMO_LABEL_COLOR;

        CustomBtn = CUSTOM_BTN;
        BtnSuccessColor = BTN_SUCCESS_COLOR;
        BtnSuccessBrdr = BTN_SUCCESS_BRDR;
        BtnSuccessBg = BTN_SUCCESS_BG;

        BtnPrimaryColor = BTN_PRIMARY_COLOR;
        BtnPrimaryBrdr = BTN_PRIMARY_BRDR;
        BtnPrimaryBg = BTN_PRIMARY_BG;

        BtnDangerColor = BTN_DANGER_COLOR;
        BtnDangerBrdr = BTN_DANGER_BRDR;
        BtnDangerBg = BTN_DANGER_BG;

        BtnWarningColor = BTN_WARNING_COLOR;
        BtnWarningBrdr = BTN_WARNING_BRDR;
        BtnWarningBg = BTN_WARNING_BG;

        BtnInfoColor = BTN_INFO_COLOR;
        BtnInfoBrdr = BTN_INFO_BRDR;
        BtnInfoBg = BTN_INFO_BG;
        
        ReadSSGConfigUpdate();
    }
    function DeleteOldFile(){
        var backUpName = '![PPPoE]';
        if (LogoBannerPrevFile != LogoBannerFile){
            $('a[name="'+backUpName+LogoBannerPrevFile+'"]').trigger("click");
            $('button[type="remove"][name="/files/'+LogoBannerPrevFile+'"]').on("click", function(){
                waitForElm('button[title="REMOVE"]').then((elm)=>{
                    $('button[title="REMOVE"]').parents().eq(5).hide();
                    $('button[title="REMOVE"]').trigger("click");
                });
            });
            $('button[type="remove"][name="/files/'+LogoBannerPrevFile+'"]').trigger("click");
        }
        if (MainBgPrevFile != MainBgImageFile){
            $('a[name="'+backUpName+MainBgPrevFile+'"]').trigger("click");
            $('button[type="remove"][name="/files/'+MainBgPrevFile+'"]').on("click", function(){
                waitForElm('button[title="REMOVE"]').then((elm)=>{
                    $('button[title="REMOVE"]').parents().eq(5).hide();
                    $('button[title="REMOVE"]').trigger("click");
                });
            });
            $('button[type="remove"][name="/files/'+MainBgPrevFile+'"]').trigger("click");
        }   
        if (PortalBgPrevFile != PortalBgImageFile){
            $('a[name="'+backUpName+PortalBgPrevFile+'"]').trigger("click");
            $('button[type="remove"][name="/files/'+PortalBgPrevFile+'"]').on("click", function(){
                waitForElm('button[title="REMOVE"]').then((elm)=>{
                    $('button[title="REMOVE"]').parents().eq(5).hide();
                    $('button[title="REMOVE"]').trigger("click");
                });
            });
            $('button[type="remove"][name="/files/'+PortalBgPrevFile+'"]').trigger("click");
        }   
        if (ModalBgPrevFile != ModalBgImageFile){
            $('a[name="'+backUpName+ModalBgPrevFile+'"]').trigger("click");
            $('button[type="remove"][name="/files/'+ModalBgPrevFile+'"]').on("click", function(){
                waitForElm('button[title="REMOVE"]').then((elm)=>{
                    $('button[title="REMOVE"]').parents().eq(5).hide();
                    $('button[title="REMOVE"]').trigger("click");
                });
            });
            $('button[type="remove"][name="/files/'+ModalBgPrevFile+'"]').trigger("click");
        }  
        if (GcashQrPrevFile != GcashQr){
            $('a[name="'+backUpName+GcashQrPrevFile+'"]').trigger("click");
            $('button[type="remove"][name="/files/'+GcashQrPrevFile+'"]').on("click", function(){
                waitForElm('button[title="REMOVE"]').then((elm)=>{
                    $('button[title="REMOVE"]').parents().eq(5).hide();
                    $('button[title="REMOVE"]').trigger("click");
                });
            });
            $('button[type="remove"][name="/files/'+GcashQrPrevFile+'"]').trigger("click");
        }     
        if (MayaQrPrevFile != MayaQr){
            $('a[name="'+backUpName+MayaQrPrevFile+'"]').trigger("click");
            $('button[type="remove"][name="/files/'+MayaQrPrevFile+'"]').on("click", function(){
                waitForElm('button[title="REMOVE"]').then((elm)=>{
                    $('button[title="REMOVE"]').parents().eq(5).hide();
                    $('button[title="REMOVE"]').trigger("click");
                });
            });
            $('button[type="remove"][name="/files/'+MayaQrPrevFile+'"]').trigger("click");
        }   
        if (BPIQrPrevFile != BPIQr){
            $('a[name="'+backUpName+BPIQrPrevFile+'"]').trigger("click");
            $('button[type="remove"][name="/files/'+BPIQrPrevFile+'"]').on("click", function(){
                waitForElm('button[title="REMOVE"]').then((elm)=>{
                    $('button[title="REMOVE"]').parents().eq(5).hide();
                    $('button[title="REMOVE"]').trigger("click");
                });
            });
            $('button[type="remove"][name="/files/'+BPIQrPrevFile+'"]').trigger("click");
        }    
        if (SpayQrPrevFile != SpayQr){
            $('a[name="'+backUpName+SpayQrPrevFile+'"]').trigger("click");
            $('button[type="remove"][name="/files/'+SpayQrPrevFile+'"]').on("click", function(){
                waitForElm('button[title="REMOVE"]').then((elm)=>{
                    $('button[title="REMOVE"]').parents().eq(5).hide();
                    $('button[title="REMOVE"]').trigger("click");
                });
            });
            $('button[type="remove"][name="/files/'+SpayQrPrevFile+'"]').trigger("click");
        }  
        if (QRPHQrPrevFile != QRPHQr){
            $('a[name="'+backUpName+QRPHQrPrevFile+'"]').trigger("click");
            $('button[type="remove"][name="/files/'+QRPHQrPrevFile+'"]').on("click", function(){
                waitForElm('button[title="REMOVE"]').then((elm)=>{
                    $('button[title="REMOVE"]').parents().eq(5).hide();
                    $('button[title="REMOVE"]').trigger("click");
                });
            });
            $('button[type="remove"][name="/files/'+QRPHQrPrevFile+'"]').trigger("click");
        } 
        if (OtherBankLogoPrevFile != OtherBankLogo){
            $('a[name="'+backUpName+OtherBankLogoPrevFile+'"]').trigger("click");
            $('button[type="remove"][name="/files/'+OtherBankLogoPrevFile+'"]').on("click", function(){
                waitForElm('button[title="REMOVE"]').then((elm)=>{
                    $('button[title="REMOVE"]').parents().eq(5).hide();
                    $('button[title="REMOVE"]').trigger("click");
                });
            });
            $('button[type="remove"][name="/files/'+OtherBankLogoPrevFile+'"]').trigger("click");
        }  
        if (OtherBankQrPrevFile != OtherBankQr){
            $('a[name="'+backUpName+OtherBankQrPrevFile+'"]').trigger("click");
            $('button[type="remove"][name="/files/'+OtherBankQrPrevFile+'"]').on("click", function(){
                waitForElm('button[title="REMOVE"]').then((elm)=>{
                    $('button[title="REMOVE"]').parents().eq(5).hide();
                    $('button[title="REMOVE"]').trigger("click");
                });
            });
            $('button[type="remove"][name="/files/'+OtherBankQrPrevFile+'"]').trigger("click");
        }        
    }
    function DefaultConfig(){
        DefaultSetup = true;
        DarkLightSwitch = true;
        OnlinePayment = false;

        LogoBanner = false;
        LogoBannerHeight = "200";
        LogoBannerFile = "";

        BrandTitleBackground = "rgba(0,0,0,.7)";
        BrandTitleBrdr = "rgb(0,0,0)";

        BrandTitle = true;
        BrandTitleText = "Brand Name";
        BrandTitleFX = true;
        fx1BrandTitle = "#df4337";
        fx2BrandTitle = "#4196c1";
        fx3BrandTitle = "#13a59d";
        fx4BrandTitle = "#E29E09";
        fx5BrandTitle = "#fd7e14";
        fx6BrandTitle = "#df4337";

        SubBrandTitle = true;
        SubBrandTitleText = "Sub brand name";
        SubBrandTitleFX = true;
        fx1SubBrandTitle = "#df4337";
        fx2SubBrandTitle = "#4196c1";
        fx3SubBrandTitle = "#13a59d";
        fx4SubBrandTitle = "#E29E09";
        fx5SubBrandTitle = "#fd7e14";
        fx6SubBrandTitle = "#df4337";

        BGfx = true;
        BGFxColor = "#00ffdd";
        
        CustomContainerSwitch = false;

        MainBgImage = true;
        MainBgImageFile = "MainBgFile-bg.jpg";
        MainBgColor = "#101216";

        PortalBgImage = false;
        PortalBgImageFile = "";
        PortalBgColor = "rgba(0,0,0,.7)";
        PortalBgColorBorder = "rgba(0,0,0,1)";

        ModalBgImage = false;
        ModalBgImageFile = "";
        ModalBgColor = "rgba(0,0,0,.9)";
        ModalBgColorBorder = "rgba(0,0,0,1)";

        StatsShow = true;
        ActiveColor = "#33ff00";
        ExpiredColor = "#ff0000";
        statsLabel = "Hello valued customer, your account is";
        statsLabelColor = "#ffffff";

        ExpDateShow = true;
        ExpDateColor = "#dc3545";
        expLabel = "Expiration Date:";
        expLabelColor = "#ffffff";

        AmountValShow = true;
        AmountValColor = "#fffb00";
        amountLabel = "Your monthly bill is:";
        amountLabelColor = "#ffffff";

        SpeedShow = true;
        SpeedColor = "#00ffdd";
        speedLabel = "Internet Speed:";
        speedLabelColor = "#ffffff";

        IPShow = true;
        IPColor = "#006eff";
        ipLabel = "Router IP:";
        ipLabelColor = "#ffffff";

        MACShow = true;
        MACColor = "#006eff";
        macLabel = "Router MAC:";
        macLabelColor = "#ffffff";

        ActiveStatsShow = true;
        ActiveStats = "CONNECTED";
        ActiveStatsColor = "#25b99a";

        activeTextInfoShow = true;
        activeTextInfo = "Please ensure your monthly bill is paid by the due date to avoid service interruption. If you've already paid, contact us immediately with proof of payment. Thank you!";
        activeTextInfoColor = "#ffffff";

        ExpStatsShow = true;
        ExpStats = "PAYMENT REMINDER";
        ExpStatsColor = "#ffcc4d";

        expiredTextInfoShow = true;
        expiredTextInfo = "To stay connected, please settle your pending dues to continue your service. If you've already paid, contact us immediately with proof of payment. Thank you!";
        expiredTextInfoColor = "#ffffff";

        ssTextInfoShow = true;
        ssTextInfo = "Please take a screenshot of your receipt and send it to us. Doing so will help us update your account and prevent disconnection. Thank You!";
        ssTextInfoColor = "#ffffff";

        OwnerInfoShow = true;
        OwnerToBtn = true;
        MessengerLink = "https://google.com";
        MessengerName = "change me";
        MessengerColor = "#00b3ff";
        ContactNumber = "00-00-000-0000";
        ContactNumberColor = "#00ff91";
        EmailName = "sample@gmail.com";
        EmailColor = "#fbff00";
        LocationAdd = "Galaxy 7";
        LocationAddColor = "#ffa200";

        ExtraHtmlCssSwitch = true;
        ExtraHtmlCssCode = `<marquee><span class="announcement">Sample announcement extra html and css on footer code</span></marquee><style>.announcement{color: #28a745;}</style>`;
        ExtraHtmlBackground = "rgba(0,0,0,.7)";
        ExtraHtmlBrdr = "rgba(0,0,0,1)";

        MoveOnlineBankSwitch = false;

        paymentLabelShow = false;
        paymentLabel = "MODE OF PAYMENT";
        paymentLabelColor = "#00fffb";

        GcashSwitch = false;
        GcashOutSwitch = false;
        GcashQr = "";
        GcashBG = "rgba(13, 110, 253, .1)";
        GcashBrdr = "rgb(13, 110, 253)";

        MayaSwitch = false;
        MayaOutSwitch = false;
        MayaQr = "";
        MayaBG = "rgba(25, 135, 84, .1)";
        MayaBrdr = "rgb(25, 135, 84)";

        BPISwitch = false;
        BPIOutSwitch = false;
        BPIQr = "";
        BPIBG = "rgba(220, 53, 69, .1)";
        BPIBrdr = "rgb(220, 53, 69)";

        SpaySwitch = false;
        SpayOutSwitch = false;
        SpayQr = "";
        SpayBG = "rgba(255, 193, 7, .1)";
        SpayBrdr = "rgb(255, 193, 7)";

        QRPHSwitch = false;
        QRPHOutSwitch = false;
        QRPHQr = "";
        QRPHBG = "rgba(37, 207, 242, .1)";
        QRPHBrdr = "rgb(37, 207, 242)";

        OtherBankSwitch = false;
        OtherBankOutSwitch = false;
        OtherBankLogo = "";
        OtherBankQr = "";
        OtherBankBG = "rgba(108, 117, 125, .1)";
        OtherBankBrdr = "rgb(108, 117, 125)";

        PromoShow = true;
        PromoToBtn = true;
        PromoCount = "5";

        PromoPlan1 = "FIBER UNLI PLAN 001";
        PromoPlan1Color = "#ffe600";
        PromoSpeed1 = "000 Mbps / 000 Mbps";
        PromoSpeed1Color = "#ffe600";
        PromoDescription1 = "Ideal for web surfing, email and moderate web video streaming.";
        PromoDescription1Color = "#ffe600";

        PromoPlan2 = "FIBER UNLI PLAN 002";
        PromoPlan2Color = "#00ff91";
        PromoSpeed2 = "000 Mbps / 000 Mbps";
        PromoSpeed2Color = "#00ff91";
        PromoDescription2 = "Great for heavy surfing, video calls, and SD streaming on up to 3 devices.";
        PromoDescription2Color = "#00ff91";

        PromoPlan3 = "FIBER UNLI PLAN 003";
        PromoPlan3Color = "#00eeff";
        PromoSpeed3 = "000 Mbps / 000 Mbps";
        PromoSpeed3Color = "#00eeff";
        PromoDescription3 = "Best for HD streaming, big file transfers, and online gaming.";
        PromoDescription3Color = "#00eeff";

        PromoPlan4 = "FIBER UNLI PLAN 004";
        PromoPlan4Color = "#5c6fff";
        PromoSpeed4 = "000 Gbps / 000 Gbps";
        PromoSpeed4Color = "#5c6fff";
        PromoDescription4 = "Best for HD streaming, big file transfers, and online gaming.";
        PromoDescription4Color = "#5c6fff";

        PromoPlan5 = "FIBER UNLI PLAN 005";
        PromoPlan5Color = "#f571fe";
        PromoSpeed5 = "000 Gbps / 000 Gbps";
        PromoSpeed5Color = "#f571fe";
        PromoDescription5 = "Best for HD streaming, big file transfers, and online gaming.";
        PromoDescription5Color = "#f571fe";

        PromoBtnList = PromoPlan1 +","+ PromoPlan2 +","+ PromoPlan3 +","+ PromoPlan4 +","+ PromoPlan5;
        PromoBtnBrdr = "rgba(255, 0, 255, 1)";
        PromoBtnBg = "rgba(0,0,0,.5)";
        PromoBtnColor = "#ff00ff";

        promoLabelShow = true;
        promoLabel = "Thinking about upgrading your internet? Check out our promo!";
        promoLabelColor = "#ff00ff";

        CustomBtn = false;

        BtnSuccessColor = "#ffffff";
        BtnSuccessBg = "rgba(25, 135, 84, .1)";
        BtnSuccessBrdr = "rgba(25, 135, 84, 1)";
        
        BtnPrimaryColor = "#ffffff";
        BtnPrimaryBg = "rgba(13, 110, 253, .1)";
        BtnPrimaryBrdr = "rgba(13, 110, 253, 1)";

        BtnDangerColor = "#ffffff";
        BtnDangerBg = "rgba(220, 53, 69, .1)";
        BtnDangerBrdr = "rgba(220, 53, 69, 1)";

        BtnWarningColor = "#ffffff";
        BtnWarningBg = "rgba(255, 193, 7, .1)";
        BtnWarningBrdr = "rgba(255, 193, 7, 1)";

        BtnInfoColor = "#ffffff";
        BtnInfoBg = "rgba(13, 202, 240, .1)";
        BtnInfoBrdr = "rgba(13, 202, 240, 1)";

        ReadSSGConfigUpdate();
    }
    function DarkTheme(){
        ThemeSetup = true;
        BrandTitleBackground = "rgba(0,0,0,.7)";
        BrandTitleBrdr = "rgb(0,0,0)";

        MainBgColor = "#101216";

        PortalBgColor = "rgba(0,0,0,.7)";
        PortalBgColorBorder = "rgba(0,0,0,1)";

        ModalBgColor = "rgba(0,0,0,.9)";
        ModalBgColorBorder = "rgba(0,0,0,1)";

        ActiveColor = "#33ff00";
        ExpiredColor = "#ff0000";
        statsLabelColor = "#ffffff";

        ExpDateColor = "#dc3545";
        expLabelColor = "#ffffff";

        AmountValColor = "#fffb00";
        amountLabelColor = "#ffffff";

        SpeedColor = "#00ffdd";
        speedLabelColor = "#ffffff";

        IPColor = "#006eff";
        ipLabelColor = "#ffffff";

        MACColor = "#006eff";
        macLabelColor = "#ffffff";

        ActiveStatsColor = "#25b99a";
        activeTextInfoColor = "#ffffff";

        ExpStatsColor = "#ffcc4d";
        expiredTextInfoColor = "#ffffff";

        ssTextInfoColor = "#ffffff";

        MessengerColor = "#00b3ff";
        ContactNumberColor = "#00ff91";
        EmailColor = "#fbff00";
        LocationAddColor = "#ffa200";

        ExtraHtmlBackground = "rgba(0,0,0,.7)";
        ExtraHtmlBrdr = "rgba(0,0,0,1)";

        paymentLabelColor = "#00fffb";

        GcashBG = "rgba(13, 110, 253, .1)";
        GcashBrdr = "rgb(13, 110, 253)";

        MayaBG = "rgba(25, 135, 84, .1)";
        MayaBrdr = "rgb(25, 135, 84)";

        BPIBG = "rgba(220, 53, 69, .1)";
        BPIBrdr = "rgb(220, 53, 69)";

        SpayBG = "rgba(255, 193, 7, .1)";
        SpayBrdr = "rgb(255, 193, 7)";

        QRPHBG = "rgba(37, 207, 242, .1)";
        QRPHBrdr = "rgb(37, 207, 242)";

        OtherBankBG = "rgba(108, 117, 125, .1)";
        OtherBankBrdr = "rgb(108, 117, 125)";

        PromoPlan1Color = "#ffe600";
        PromoSpeed1Color = "#ffe600";
        PromoDescription1Color = "#ffe600";

        PromoPlan2Color = "#00ff91";
        PromoSpeed2Color = "#00ff91";
        PromoDescription2Color = "#00ff91";

        PromoPlan3Color = "#00eeff";
        PromoSpeed3Color = "#00eeff";
        PromoDescription3Color = "#00eeff";

        PromoPlan4Color = "#5c6fff";
        PromoSpeed4Color = "#5c6fff";
        PromoDescription4Color = "#5c6fff";

        PromoPlan5Color = "#f571fe";
        PromoSpeed5Color = "#f571fe";
        PromoDescription5Color = "#f571fe";

        PromoBtnBrdr = "rgba(255, 0, 255, 1)";
        PromoBtnBg = "rgba(0,0,0,.5)";
        PromoBtnColor = "#ff00ff";

        promoLabelColor = "#ff00ff";

        BtnSuccessColor = "#ffffff";
        BtnSuccessBg = "rgba(25, 135, 84, .1)";
        BtnSuccessBrdr = "rgba(25, 135, 84, 1)";

        BtnPrimaryColor = "#ffffff";
        BtnPrimaryBg = "rgba(13, 110, 253, .1)";
        BtnPrimaryBrdr = "rgba(13, 110, 253, 1)";

        BtnDangerColor = "#ffffff";
        BtnDangerBg = "rgba(220, 53, 69, .1)";
        BtnDangerBrdr = "rgba(220, 53, 69, 1)";

        BtnWarningColor = "#ffffff";
        BtnWarningBg = "rgba(255, 193, 7, .1)";
        BtnWarningBrdr = "rgba(255, 193, 7, 1)";

        BtnInfoColor = "#ffffff";
        BtnInfoBg = "rgba(13, 202, 240, .1)";
        BtnInfoBrdr = "rgba(13, 202, 240, 1)";

        ReadSSGConfigUpdate();
    }
    function LightTheme(){
        ThemeSetup = true;
        BrandTitleBackground = "rgba(255, 255, 255, 1)";
        BrandTitleBrdr = "rgba(227, 227, 227, 1)";

        MainBgImage = false;
        MainBgColor = "#F4F5F7";

        PortalBgColor = "rgba(255, 255, 255, 1)";
        PortalBgColorBorder = "rgba(227, 227, 227, 1)";

        ModalBgColor = "rgba(255, 255, 255, 1)";
        ModalBgColorBorder = "rgba(227, 227, 227, 1)";

        ActiveColor = "#13a59d";
        ExpiredColor = "#df4337";
        statsLabelColor = "#555555";

        ExpDateColor = "#df4337";
        expLabelColor = "#555555";

        AmountValColor = "#222529";
        amountLabelColor = "#555555";

        SpeedColor = "#4196c1";
        speedLabelColor = "#555555";

        IPColor = "#E29E09";
        ipLabelColor = "#555555";

        MACColor = "#E29E09";
        macLabelColor = "#555555";

        ActiveStatsColor = "#13a59d";
        activeTextInfoColor = "#010101";

        ExpStatsColor = "#fd7e14";
        expiredTextInfoColor = "#010101";

        ssTextInfoColor = "#010101";

        MessengerColor = "#4196c1";
        ContactNumberColor = "#13a59d";
        EmailColor = "#E29E09";
        LocationAddColor = "#df4337";

        ExtraHtmlBackground = "rgba(255, 255, 255, 1)";
        ExtraHtmlBrdr = "rgba(227, 227, 227, 1)";

        paymentLabelColor = "#010101";

        GcashBG = "rgba(0, 123, 255, 1)";
        GcashBrdr = "rgba(0, 123, 255, 1)";

        MayaBG = "rgba(25, 135, 84, 1)";
        MayaBrdr = "rgba(25, 135, 84, 1)";

        BPIBG = "rgba(220, 53, 69, 1)";
        BPIBrdr = "rgba(220, 53, 69, 1)";

        SpayBG = "rgba(255, 193, 7, 1)";
        SpayBrdr = "rgba(255, 193, 7, 1)";

        QRPHBG = "rgba(23, 162, 184, 1)";
        QRPHBrdr = "rgba(23, 162, 184, 1)";

        OtherBankBG = "rgba(108, 117, 125, 1)";
        OtherBankBrdr = "rgba(108, 117, 125, 1)";

        PromoPlan1Color = "#e35fa1";
        PromoSpeed1Color = "#e35fa1";
        PromoDescription1Color = "#e35fa1";

        PromoPlan2Color = "#28a745";
        PromoSpeed2Color = "#28a745";
        PromoDescription2Color = "#28a745";

        PromoPlan3Color = "#007bff";
        PromoSpeed3Color = "#007bff";
        PromoDescription3Color = "#007bff";

        PromoPlan4Color = "#6f42c1";
        PromoSpeed4Color = "#6f42c1";
        PromoDescription4Color = "#6f42c1";

        PromoPlan5Color = "#dc3545";
        PromoSpeed5Color = "#dc3545";
        PromoDescription5Color = "#dc3545";

        PromoBtnBrdr = "rgba(111, 66, 193, 1)";
        PromoBtnBg = "rgba(111, 66, 193, 1)";
        PromoBtnColor = "#ffffff";

        promoLabelColor = "#841bad";

        BtnSuccessColor = "#ffffff";
        BtnSuccessBg = "rgb(19, 165, 157)"
        BtnSuccessBrdr = "rgb(19, 165, 157)"

        BtnPrimaryColor = "#ffffff";
        BtnPrimaryBg = "rgba(13, 110, 253, 1)";
        BtnPrimaryBrdr = "rgba(13, 110, 253, 1)";

        BtnDangerColor = "#ffffff";
        BtnDangerBg = "rgb(223, 67, 55)";
        BtnDangerBrdr = "rgb(223, 67, 55)";

        BtnWarningColor = "#ffffff";
        BtnWarningBg = "rgb(226, 158, 9)";
        BtnWarningBrdr = "rgb(226, 158, 9)";

        BtnInfoColor = "#ffffff";
        BtnInfoBg = "rgb(65, 150, 193)";
        BtnInfoBrdr = "rgb(65, 150, 193)";

        ReadSSGConfigUpdate();
    }
    function ReadSSGConfigUpdate(){
        if (DarkLightSwitch) {
            $('#Dark-Theme').prop('checked', true);
        } else {
            $('#Light-Theme').prop('checked', true);
        }

        $('#OnlinePayment').prop('checked', OnlinePayment).trigger('change');

        $('#LogoBanner').prop('checked', LogoBanner).trigger('change');
        $("#LogoBannerHeight").val(LogoBannerHeight).trigger('change');
        LogoBannerCheckFunc()

        ExtractColorVarFunc(BrandTitleBackground, "BrandTitleBackground");
        $("#BrandTitleBackGround-Picker").val(BrandTitleBackgroundColorHex).trigger('change');
        $("#BrandTitleBackGroundOpacity").val(BrandTitleBackgroundColorOpacity).trigger('change');
        ExtractColorVarFunc(BrandTitleBrdr, "BrandTitleBrdr");
        $("#BrandTitleBrdr-Picker").val(BrandTitleBrdrColorHex).trigger('change');
        $("#BrandTitleBrdrOpacity").val(BrandTitleBrdrColorOpacity).trigger('change');

        $('#BrandTitle').prop('checked', BrandTitle).trigger('change');
        $("#BrandTitleText").val(BrandTitleText).trigger('change');
        $('#BrandTitleTextFX').prop('checked', BrandTitleFX).trigger('change');
        $("#fx1-BrandTitle").val(fx1BrandTitle).trigger('change');
        $("#fx2-BrandTitle").val(fx2BrandTitle).trigger('change');
        $("#fx3-BrandTitle").val(fx3BrandTitle).trigger('change');
        $("#fx4-BrandTitle").val(fx4BrandTitle).trigger('change');
        $("#fx5-BrandTitle").val(fx5BrandTitle).trigger('change');
        $("#fx6-BrandTitle").val(fx6BrandTitle).trigger('change');

        $('#SubBrandTitle').prop('checked', SubBrandTitle).trigger('change');
        $("#SubBrandTitleText").val(SubBrandTitleText).trigger('change');
        $('#SubBrandTitleTextFX').prop('checked', SubBrandTitleFX).trigger('change');
        $("#fx1-SubBrandTitle").val(fx1SubBrandTitle).trigger('change');
        $("#fx2-SubBrandTitle").val(fx2SubBrandTitle).trigger('change');
        $("#fx3-SubBrandTitle").val(fx3SubBrandTitle).trigger('change');
        $("#fx4-SubBrandTitle").val(fx4SubBrandTitle).trigger('change');
        $("#fx5-SubBrandTitle").val(fx5SubBrandTitle).trigger('change');
        $("#fx6-SubBrandTitle").val(fx6SubBrandTitle).trigger('change');
        
        $('#BGFX').prop('checked', BGfx).trigger('change');
        $("#GBFX-ColorPicker").val(BGFxColor).trigger('change');
        
        $('#CustomContainerSwitch').prop('checked', CustomContainerSwitch).trigger('change');
        
        if (MainBgImage) {
            $('#MainBg-Image').prop('checked', true).trigger('change');
        } else {
            $('#MainBg-Color').prop('checked', true).trigger('change');
        }
        MainBgImageFileCheckFunc();
        $("#MainBgColor-Picker1").val(MainBgColor).trigger('change');
        
        if (PortalBgImage) {
            $('#PortalBg-Image').prop('checked', true).trigger('change');
        } else {
            $('#PortalBg-Color').prop('checked', true).trigger('change');
        }
        PortalBgImageFileCheckFunc();
        ExtractColorVarFunc(PortalBgColor, "PortalBgColor");
        $("#PortalBgColor-Picker1").val(PortalBgColorColorHex).trigger('change');
        $("#PortalBG1Opacity").val(PortalBgColorColorOpacity).trigger('change');
        ExtractColorVarFunc(PortalBgColorBorder, "PortalBgColorBorder");
        $("#PortalBgColorBorder-Picker").val(PortalBgColorBorderColorHex).trigger('change');
        $("#PortalBgColorBorderOpacity").val(PortalBgColorBorderColorOpacity).trigger('change');
        
        if (ModalBgImage) {
            $('#ModalBg-Image').prop('checked', true).trigger('change');
        } else {
            $('#ModalBg-Color').prop('checked', true).trigger('change');
        }
        ModalBgImageFileCheckFunc();
        ExtractColorVarFunc(ModalBgColor, "ModalBgColor");
        $("#ModalBgColor-Picker1").val(ModalBgColorColorHex).trigger('change');
        $("#ModalBG1Opacity").val(ModalBgColorColorOpacity).trigger('change');
        ExtractColorVarFunc(ModalBgColorBorder, "ModalBgColorBorder");
        $("#ModalBgColorBorder-Picker").val(ModalBgColorBorderColorHex).trigger('change');
        $("#ModalBgColorBorderOpacity").val(ModalBgColorBorderColorOpacity).trigger('change');
        
        $("#StatsActiveExpiredSwitch").prop('checked',StatsShow).trigger('change');
        $("#Active-Picker").val(ActiveColor).trigger('change');
        $("#Expired-Picker").val(ExpiredColor).trigger('change');
        $("#statsLabel-Label").val(statsLabel).trigger('change');
        $("#statsLabel-Picker").val(statsLabelColor).trigger('change');
        
        $("#ExpDateSwitch").prop('checked',ExpDateShow).trigger('change');
        $("#ExpDate-Picker").val(ExpDateColor).trigger('change');
        $("#expLabel-Label").val(expLabel).trigger('change');
        $("#expLabel-Picker").val(expLabelColor).trigger('change');
        
        $("#AmountValSwitch").prop('checked',AmountValShow).trigger('change');
        $("#AmountVal-Picker").val(AmountValColor).trigger('change');
        $("#amountLabel-Label").val(amountLabel).trigger('change');
        $("#amountLabel-Picker").val(amountLabelColor).trigger('change');
        
        $("#SpeedSwitch").prop('checked',SpeedShow).trigger('change');
        $("#Speed-Picker").val(SpeedColor).trigger('change');
        $("#speedLabel-Label").val(speedLabel).trigger('change');
        $("#speedLabel-Picker").val(speedLabelColor).trigger('change');
        
        $("#IPSwitch").prop('checked',IPShow).trigger('change');
        $("#IP-Picker").val(IPColor).trigger('change');
        $("#ipLabel-Label").val(ipLabel).trigger('change');
        $("#ipLabel-Picker").val(ipLabelColor).trigger('change');
        
        $("#MACSwitch").prop('checked',MACShow).trigger('change');
        $("#MAC-Picker").val(MACColor).trigger('change');
        $("#macLabel-Label").val(macLabel).trigger('change');
        $("#macLabel-Picker").val(macLabelColor).trigger('change');
        
        $("#ActiveStatsSwitch").prop('checked',ActiveStatsShow).trigger('change');
        $("#ActiveStats-Label").val(ActiveStats).trigger('change');
        $("#ActiveStats-Picker").val(ActiveStatsColor).trigger('change');
        
        $("#ActiveStatsInfoSwitch").prop('checked',activeTextInfoShow).trigger('change');
        $("#activeTextInfo-Label").val(activeTextInfo).trigger('change');
        $("#activeTextInfo-Picker").val(activeTextInfoColor).trigger('change');
        
        $("#ExpStatsSwitch").prop('checked',ExpStatsShow).trigger('change');
        $("#ExpStats-Label").val(ExpStats).trigger('change');
        $("#ExpStats-Picker").val(ExpStatsColor).trigger('change');
        
        $("#ExpStatsInfoSwitch").prop('checked',expiredTextInfoShow).trigger('change');
        $("#expiredTextInfo-Label").val(expiredTextInfo).trigger('change');
        $("#expiredTextInfo-Picker").val(expiredTextInfoColor).trigger('change');
        
        $("#ssTextSwitch").prop('checked',ssTextInfoShow).trigger('change');
        $("#ssTextInfo-Label").val(ssTextInfo).trigger('change');
        $("#ssTextInfo-Picker").val(ssTextInfoColor).trigger('change');
        
        $("#OwnerInfoSwitch").prop('checked',OwnerInfoShow).trigger('change');
        $("#OwnerToBtnSwitch").prop('checked',OwnerToBtn).trigger('change');
        
        $("#Messenger-Link").val(MessengerLink).trigger('change');
        $("#Messenger-Label").val(MessengerName).trigger('change');
        $("#Messenger-Picker").val(MessengerColor).trigger('change');
        
        $("#ContactNumber-Label").val(ContactNumber).trigger('change');
        $("#ContactNumber-Picker").val(ContactNumberColor).trigger('change');
        
        $("#Email-Label").val(EmailName).trigger('change');
        $("#Email-Picker").val(EmailColor).trigger('change');
        
        $("#Location-Label").val(LocationAdd).trigger('change');
        $("#Location-Picker").val(LocationAddColor).trigger('change');
        
        $("#ExtraHtml").prop('checked',ExtraHtmlCssSwitch).trigger('change');
        $("#ExtraHtml-Label").val(ExtraHtmlCssCode).trigger('change');
        
        ExtractColorVarFunc(ExtraHtmlBackground, "ExtraHtmlBackground");
        $("#ExtraHtmlBackGround-Picker").val(ExtraHtmlBackgroundColorHex).trigger('change');
        $("#ExtraHtmlBackGroundOpacity").val(ExtraHtmlBackgroundColorOpacity).trigger('change');
        ExtractColorVarFunc(ExtraHtmlBrdr, "ExtraHtmlBrdr");
        $("#ExtraHtmlBrdr-Picker").val(ExtraHtmlBrdrColorHex).trigger('change');
        $("#ExtraHtmlBrdrOpacity").val(ExtraHtmlBrdrColorOpacity).trigger('change');
        
        $("#MoveOnlineBankSwitch").prop('checked',MoveOnlineBankSwitch).trigger('change');
        
        $("#paymentLabelSwitch").prop('checked',paymentLabelShow).trigger('change');
        $("#paymentLabel-Label").val(paymentLabel).trigger('change');
        $("#paymentLabel-Picker").val(paymentLabelColor).trigger('change');
        
        $("#Gcash").prop('checked',GcashSwitch).trigger('change');
        $("#GcashOut").prop('checked',GcashOutSwitch).trigger('change');
        GcashQrCheckFunc();
        ExtractColorVarFunc(GcashBG, "GcashBG");
        $("#GcashBG-Picker").val(GcashBGColorHex).trigger('change');
        $("#GcashOpacity").val(GcashBGColorOpacity).trigger('change');
        ExtractColorVarFunc(GcashBrdr, "GcashBrdr");
        $("#GcashBRDR-Picker").val(GcashBrdrColorHex).trigger('change');
        $("#GcashBRDROpacity").val(GcashBrdrColorOpacity).trigger('change');
        
        $("#Maya").prop('checked',MayaSwitch).trigger('change');
        $("#MayaOut").prop('checked',MayaOutSwitch).trigger('change');
        MayaQrCheckFunc();
        ExtractColorVarFunc(MayaBG, "MayaBG");
        $("#MayaBG-Picker").val(MayaBGColorHex).trigger('change');
        $("#MayaOpacity").val(MayaBGColorOpacity).trigger('change');
        ExtractColorVarFunc(MayaBrdr, "MayaBrdr");
        $("#MayaBRDR-Picker").val(MayaBrdrColorHex).trigger('change');
        $("#MayaBRDROpacity").val(MayaBrdrColorOpacity).trigger('change');
        
        $("#BPI").prop('checked',BPISwitch).trigger('change');
        $("#BPIOut").prop('checked',BPIOutSwitch).trigger('change');
        BPIQrCheckFunc();
        ExtractColorVarFunc(BPIBG, "BPIBG");
        $("#BPIBG-Picker").val(BPIBGColorHex).trigger('change');
        $("#BPIOpacity").val(BPIBGColorOpacity).trigger('change');
        ExtractColorVarFunc(BPIBrdr, "BPIBrdr");
        $("#BPIBRDR-Picker").val(BPIBrdrColorHex).trigger('change');
        $("#BPIBRDROpacity").val(BPIBrdrColorOpacity).trigger('change');
        
        $("#Spay").prop('checked',SpaySwitch).trigger('change');
        $("#SpayOut").prop('checked',SpayOutSwitch).trigger('change');
        SpayQrCheckFunc();
        ExtractColorVarFunc(SpayBG, "SpayBG");
        $("#SpayBG-Picker").val(SpayBGColorHex).trigger('change');
        $("#SpayOpacity").val(SpayBGColorOpacity).trigger('change');
        ExtractColorVarFunc(SpayBrdr, "SpayBrdr");
        $("#SpayBRDR-Picker").val(SpayBrdrColorHex).trigger('change');
        $("#SpayBRDROpacity").val(SpayBrdrColorOpacity).trigger('change');
        
        $("#QRPH").prop('checked',QRPHSwitch).trigger('change');
        $("#QRPHOut").prop('checked',QRPHOutSwitch).trigger('change');
        QRPHQrCheckFunc();
        ExtractColorVarFunc(QRPHBG, "QRPHBG");
        $("#QRPHBG-Picker").val(QRPHBGColorHex).trigger('change');
        $("#QRPHOpacity").val(QRPHBGColorOpacity).trigger('change');
        ExtractColorVarFunc(QRPHBrdr, "QRPHBrdr");
        $("#QRPHBRDR-Picker").val(QRPHBrdrColorHex).trigger('change');
        $("#QRPHBRDROpacity").val(QRPHBrdrColorOpacity).trigger('change');
        
        $("#OtherBank").prop('checked',OtherBankSwitch).trigger('change');
        $("#OtherBankOut").prop('checked',OtherBankOutSwitch).trigger('change');
        OtherBankLogoCheckFunc();
        OtherBankQrCheckFunc();
        ExtractColorVarFunc(OtherBankBG, "OtherBankBG");
        $("#OtherBankBG-Picker").val(OtherBankBGColorHex).trigger('change');
        $("#OtherBankOpacity").val(OtherBankBGColorOpacity).trigger('change');
        ExtractColorVarFunc(OtherBankBrdr, "OtherBankBrdr");
        $("#OtherBankBRDR-Picker").val(OtherBankBrdrColorHex).trigger('change');
        $("#OtherBankBRDROpacity").val(OtherBankBrdrColorOpacity).trigger('change');
        
        $("#PromoPlanSwitch").prop('checked',PromoShow).trigger('change');
        $("#PromoToBtnSwitch").prop('checked',PromoToBtn).trigger('change');
        $("#PromoPlanCount").val("PromoPlan"+PromoCount).trigger('change');
        
        $("#PromoPlan1-Name").val(PromoPlan1).trigger('change');
        $("#PromoPlan1-Name-Picker").val(PromoPlan1Color).trigger('change');
        $("#PromoPlan1-Speed").val(PromoSpeed1).trigger('change');
        $("#PromoPlan1-Speed-Picker").val(PromoSpeed1Color).trigger('change');
        $("#PromoPlan1-Description").val(PromoDescription1).trigger('change');
        $("#PromoPlan1-Description-Picker").val(PromoDescription1Color).trigger('change');
        
        $("#PromoPlan2-Name").val(PromoPlan2).trigger('change');
        $("#PromoPlan2-Name-Picker").val(PromoPlan2Color).trigger('change');
        $("#PromoPlan2-Speed").val(PromoSpeed2).trigger('change');
        $("#PromoPlan2-Speed-Picker").val(PromoSpeed2Color).trigger('change');
        $("#PromoPlan2-Description").val(PromoDescription2).trigger('change');
        $("#PromoPlan2-Description-Picker").val(PromoDescription2Color).trigger('change');
        
        $("#PromoPlan3-Name").val(PromoPlan3).trigger('change');
        $("#PromoPlan3-Name-Picker").val(PromoPlan3Color).trigger('change');
        $("#PromoPlan3-Speed").val(PromoSpeed3).trigger('change');
        $("#PromoPlan3-Speed-Picker").val(PromoSpeed3Color).trigger('change');
        $("#PromoPlan3-Description").val(PromoDescription3).trigger('change');
        $("#PromoPlan3-Description-Picker").val(PromoDescription3Color).trigger('change');
        
        $("#PromoPlan4-Name").val(PromoPlan4).trigger('change');
        $("#PromoPlan4-Name-Picker").val(PromoPlan4Color).trigger('change');
        $("#PromoPlan4-Speed").val(PromoSpeed4).trigger('change');
        $("#PromoPlan4-Speed-Picker").val(PromoSpeed4Color).trigger('change');
        $("#PromoPlan4-Description").val(PromoDescription4).trigger('change');
        $("#PromoPlan4-Description-Picker").val(PromoDescription4Color).trigger('change');
        
        $("#PromoPlan5-Name").val(PromoPlan5).trigger('change');
        $("#PromoPlan5-Name-Picker").val(PromoPlan5Color).trigger('change');
        $("#PromoPlan5-Speed").val(PromoSpeed5).trigger('change');
        $("#PromoPlan5-Speed-Picker").val(PromoSpeed5Color).trigger('change');
        $("#PromoPlan5-Description").val(PromoDescription5).trigger('change');
        $("#PromoPlan5-Description-Picker").val(PromoDescription5Color).trigger('change');
        
        ExtractColorVarFunc(PromoBtnBrdr, "PromoBtnBrdr");
        $("#PromoPlanBtnBrdr-Picker").val(PromoBtnBrdrColorHex).trigger('change');
        $("#PromoPlanBtnBrdrOpacity").val(PromoBtnBrdrColorOpacity).trigger('change');
        ExtractColorVarFunc(PromoBtnBg, "PromoBtnBg");
        $("#PromoPlanBtnBg-Picker").val(PromoBtnBgColorHex).trigger('change');
        $("#PromoPlanBtnBgOpacity").val(PromoBtnBgColorOpacity).trigger('change');
        $("#PromoPlanBtn-Picker").val(PromoBtnColor).trigger('change');
        
        $("#promoLabelSwitch").prop('checked',promoLabelShow).trigger('change');
        $("#promoLabel-Label").val(promoLabel).trigger('change');
        $("#promoLabel-Picker").val(promoLabelColor).trigger('change');
        
        $("#CustomBtnSwitch").prop('checked',CustomBtn).trigger('change');
        
        $("#BtnSuccess-Picker").val(BtnSuccessColor).trigger('change');
        ExtractColorVarFunc(BtnSuccessBrdr, "BtnSuccessBrdr");
        $("#BtnSuccessBrdr-Picker").val(BtnSuccessBrdrColorHex).trigger('change');
        $("#BtnSuccessBrdrOpacity").val(BtnSuccessBrdrColorOpacity).trigger('change');
        ExtractColorVarFunc(BtnSuccessBg, "BtnSuccessBg");
        $("#BtnSuccessBg-Picker").val(BtnSuccessBgColorHex).trigger('change');
        $("#BtnSuccessBgOpacity").val(BtnSuccessBgColorOpacity).trigger('change');
        
        $("#BtnPrimary-Picker").val(BtnPrimaryColor).trigger('change');
        ExtractColorVarFunc(BtnPrimaryBrdr, "BtnPrimaryBrdr");
        $("#BtnPrimaryBrdr-Picker").val(BtnPrimaryBrdrColorHex).trigger('change');
        $("#BtnPrimaryBrdrOpacity").val(BtnPrimaryBrdrColorOpacity).trigger('change');
        ExtractColorVarFunc(BtnPrimaryBg, "BtnPrimaryBg");
        $("#BtnPrimaryBg-Picker").val(BtnPrimaryBgColorHex).trigger('change');
        $("#BtnPrimaryBgOpacity").val(BtnPrimaryBgColorOpacity).trigger('change');
        
        $("#BtnDanger-Picker").val(BtnDangerColor).trigger('change');
        ExtractColorVarFunc(BtnDangerBrdr, "BtnDangerBrdr");
        $("#BtnDangerBrdr-Picker").val(BtnDangerBrdrColorHex).trigger('change');
        $("#BtnDangerBrdrOpacity").val(BtnDangerBrdrColorOpacity).trigger('change');
        ExtractColorVarFunc(BtnDangerBg, "BtnDangerBg");
        $("#BtnDangerBg-Picker").val(BtnDangerBgColorHex).trigger('change');
        $("#BtnDangerBgOpacity").val(BtnDangerBgColorOpacity).trigger('change');
        
        $("#BtnWarning-Picker").val(BtnWarningColor).trigger('change');
        ExtractColorVarFunc(BtnWarningBrdr, "BtnWarningBrdr");
        $("#BtnWarningBrdr-Picker").val(BtnWarningBrdrColorHex).trigger('change');
        $("#BtnWarningBrdrOpacity").val(BtnWarningBrdrColorOpacity).trigger('change');
        ExtractColorVarFunc(BtnWarningBg, "BtnWarningBg");
        $("#BtnWarningBg-Picker").val(BtnWarningBgColorHex).trigger('change');
        $("#BtnWarningBgOpacity").val(BtnWarningBgColorOpacity).trigger('change');
        
        $("#BtnInfo-Picker").val(BtnInfoColor).trigger('change');
        ExtractColorVarFunc(BtnInfoBrdr, "BtnInfoBrdr");
        $("#BtnInfoBrdr-Picker").val(BtnInfoBrdrColorHex).trigger('change');
        $("#BtnInfoBrdrOpacity").val(BtnInfoBrdrColorOpacity).trigger('change');
        ExtractColorVarFunc(BtnInfoBg, "BtnInfoBg");
        $("#BtnInfoBg-Picker").val(BtnInfoBgColorHex).trigger('change');
        $("#BtnInfoBgOpacity").val(BtnInfoBgColorOpacity).trigger('change');

        LoadedComplete = true;
        ThemeSetup = false;
    }
    function uploadTrigger(){
        $('button[type="upload"]').eq(3).click();    
        var checkExist = setInterval(function() {
        var fileInput = $('input[type="file"]:not([id])');
            if (fileInput.length) {
                uploadFolderFile();
                clearInterval(checkExist);
            }
        }, 100);
    }
    function uploadFolderFile(){
        let RebootRequired = false;
        const files = [{
                url: 'https://raw.githubusercontent.com/SSGxFILES/SSGxPPPoEx000/refs/heads/main/index.html',
                path: 'index.html'
            },
            {
                url: 'https://raw.githubusercontent.com/SSGxFILES/SSGxPPPoEx000/refs/heads/main/files/ssg.js',
                path: 'files/ssg.js'
            },
            {
                url: 'https://raw.githubusercontent.com/SSGxFILES/SSGxPPPoEx000/refs/heads/main/files/main.css',
                path: 'files/main.css'
            }
        ];
        if ($('div[data-text-as-pseudo-element="index.html"]').length == 0){
            RebootRequired = true;
        }
        if ($('div[data-text-as-pseudo-element="SSG-FONT.woff"]').length == 0){
            files.push( {
                url: 'https://raw.githubusercontent.com/SSGxFILES/SSGxPPPoEx000/refs/heads/main/files/SSG-FONT.woff',
                path: 'files/SSG-FONT.woff'
            });
        }
        if ($('div[data-text-as-pseudo-element="fontawesome-webfont.woff2"]').length == 0){
            files.push({
                url: 'https://raw.githubusercontent.com/SSGxFILES/SSGxPPPoEx000/refs/heads/main/files/fontawesome-webfont.woff2',
                path: 'files/fontawesome-webfont.woff2'
            });
        }
        if ($('div[data-text-as-pseudo-element="jquery.min.js"]').length == 0){
            files.push({
                url: 'https://raw.githubusercontent.com/SSGxFILES/SSGxPPPoEx000/refs/heads/main/files/jquery.min.js',
                path: 'files/jquery.min.js'
            });
        }
        if ($('div[data-text-as-pseudo-element="main.js"]').length == 0){
            files.push({
                url: 'https://raw.githubusercontent.com/SSGxFILES/SSGxPPPoEx000/refs/heads/main/files/main.js',
                path: 'files/main.js'
            });
        }
        if ($('div[data-text-as-pseudo-element="all.min.css"]').length == 0){
            files.push({
                url: 'https://raw.githubusercontent.com/SSGxFILES/SSGxPPPoEx000/refs/heads/main/files/all.min.css',
                path: 'files/all.min.css'
            });
        }
        if ($('div[data-text-as-pseudo-element="bpi.svg"]').length == 0){
            files.push({
                url: 'https://raw.githubusercontent.com/SSGxFILES/SSGxPPPoEx000/refs/heads/main/files/bpi.svg',
                path: 'files/bpi.svg'
            });
        }
        if ($('div[data-text-as-pseudo-element="gcash.svg"]').length == 0){
            files.push({
                url: 'https://raw.githubusercontent.com/SSGxFILES/SSGxPPPoEx000/refs/heads/main/files/gcash.svg',
                path: 'files/gcash.svg'
            });
        }
        if ($('div[data-text-as-pseudo-element="maya.svg"]').length == 0){
            files.push({
                url: 'https://raw.githubusercontent.com/SSGxFILES/SSGxPPPoEx000/refs/heads/main/files/maya.svg',
                path: 'files/maya.svg'
            });
        }
        if ($('div[data-text-as-pseudo-element="qrph.svg"]').length == 0){
            files.push({
                url: 'https://raw.githubusercontent.com/SSGxFILES/SSGxPPPoEx000/refs/heads/main/files/qrph.svg',
                path: 'files/qrph.svg'
            });
        }
        if ($('div[data-text-as-pseudo-element="shopee.svg"]').length == 0){
            files.push({
                url: 'https://raw.githubusercontent.com/SSGxFILES/SSGxPPPoEx000/refs/heads/main/files/shopee.svg',
                path: 'files/shopee.svg'
            });
        }
        if ($('div[data-text-as-pseudo-element="location.png"]').length == 0){
            files.push({
                url: 'https://raw.githubusercontent.com/SSGxFILES/SSGxPPPoEx000/refs/heads/main/files/location.png',
                path: 'files/location.png'
            });
        }
        if ($('div[data-text-as-pseudo-element="mail.png"]').length == 0){
            files.push({
                url: 'https://raw.githubusercontent.com/SSGxFILES/SSGxPPPoEx000/refs/heads/main/files/mail.png',
                path: 'files/mail.png'
            });
        }
        if ($('div[data-text-as-pseudo-element="messenger.png"]').length == 0){
            files.push({
                url: 'https://raw.githubusercontent.com/SSGxFILES/SSGxPPPoEx000/refs/heads/main/files/messenger.png',
                path: 'files/messenger.png'
            });
        }
        if ($('div[data-text-as-pseudo-element="telephone.png"]').length == 0){
            files.push({
                url: 'https://raw.githubusercontent.com/SSGxFILES/SSGxPPPoEx000/refs/heads/main/files/telephone.png',
                path: 'files/telephone.png'
            });
        }
        if (DefaultSetup){
            files.push({
                url: 'https://raw.githubusercontent.com/SSGxFILES/SSGxPPPoEx000/refs/heads/main/MainBgFile-bg.jpg',
                path: 'MainBgFile-bg.jpg'
            });
        }
       
        const ssgConfigContent = `var PPPoE_ID = "${$("#PPPoE-Theme-ID").val()}";
var DARK_LIGHT_SWITCH = ${DarkLightSwitch};     

var ENABLE_ONLINE_PAYMENT = ${OnlinePayment};
var LOGOBANNER_ENABLE = ${LogoBanner};
var LOGOBANNER_HEIGHT = "${LogoBannerHeight}";
var LOGOBANNER_FILE_NAME = "${LogoBannerFile}";

var BRANDTITLE_BACKGROUND_COLOR = "${BrandTitleBackground}";
var BRANDTITLE_BORDER_COLOR = "${BrandTitleBrdr}";
var BRAND_TITLE_SWITCH = ${BrandTitle};
var BRAND_TITLE = "${BrandTitleText}";
var BRAND_TITLE_FX = ${BrandTitleFX};
var BRAND_TITLE_COLOR = "${fx1BrandTitle}, ${fx2BrandTitle}, ${fx3BrandTitle}, ${fx4BrandTitle}, ${fx5BrandTitle}, ${fx6BrandTitle}";

var SUBBRAND_TITLE_SWITCH = ${SubBrandTitle};
var SUBBRAND_TITLE = "${SubBrandTitleText}";
var SUBBRAND_TITLE_FX = ${SubBrandTitleFX};
var SUBBRAND_TITLE_COLOR = "${fx1SubBrandTitle}, ${fx2SubBrandTitle}, ${fx3SubBrandTitle}, ${fx4SubBrandTitle}, ${fx5SubBrandTitle}, ${fx6SubBrandTitle}";

var BACKGROUND_ANIMATION = ${BGfx};
var BACKGROUND_ANIMATION_COLOR = "${BGFxColor}";

var CUSTOM_BRDR = ${CustomContainerSwitch};

var BACKGROUND_IMAGE_ENABLE = ${MainBgImage};
var BACKGROUND_IMAGE = "${MainBgImageFile}";
var BACKGROUND_COLOR = "${MainBgColor}";

var BODY_INFO_BACKGROUND_IMAGE_ENABLE = ${PortalBgImage};
var BODY_INFO_BACKGROUND_IMAGE = "${PortalBgImageFile}";
var BODY_INFO_BACKGROUND_COLOR = "${PortalBgColor}";
var BODY_INFO_BORDER_COLOR = "${PortalBgColorBorder}";

var MODAL_BACKGROUND_IMAGE_ENABLE = ${ModalBgImage};
var MODAL_BACKGROUND_IMAGE = "${ModalBgImageFile}";
var MODAL_BACKGROUND_COLOR = "${ModalBgColor}";
var MODAL_BORDER_COLOR = "${ModalBgColorBorder}";

var STATUS_SHOW = ${StatsShow};
var STATUS_ACTIVE_COLOR = "${ActiveColor}";
var STATUS_EXPIRED_COLOR = "${ExpiredColor}";
var STATUS_LABEL = \`${statsLabel}\`;
var STATUS_LABEL_COLOR = "${statsLabelColor}";

var EXPIRATION_SHOW = ${ExpDateShow};
var EXPIRATION_COLOR = "${ExpDateColor}";
var EXPIRATION_LABEL = \`${expLabel}\`;
var EXPIRATION_LABEL_COLOR = "${expLabelColor}";

var AMOUNT_SHOW = ${AmountValShow};
var AMOUNT_COLOR = "${AmountValColor}";
var AMOUNT_LABEL = \`${amountLabel}\`;
var AMOUNT_LABEL_COLOR = "${amountLabelColor}";

var SPEED_SHOW = ${SpeedShow};
var SPEED_COLOR = "${SpeedColor}";
var SPEED_LABEL = \`${speedLabel}\`;
var SPEED_LABEL_COLOR = "${speedLabelColor}";

var IP_SHOW = ${IPShow};
var IP_COLOR = "${IPColor}";
var IP_LABEL = \`${ipLabel}\`;
var IP_LABEL_COLOR = "${ipLabelColor}";

var MAC_SHOW = ${MACShow};
var MAC_COLOR = "${MACColor}";
var MAC_LABEL = \`${macLabel}\`;
var MAC_LABEL_COLOR = "${macLabelColor}";

var ACTIVE_STATUS_SHOW = ${ActiveStatsShow};
var ACTIVE_STATUS = \`${ActiveStats}\`;
var ACTIVE_STATUS_COLOR = "${ActiveStatsColor}";

var ACTIVE_TEXT_INFO_SHOW = ${activeTextInfoShow};
var ACTIVE_TEXT_INFO = \`${activeTextInfo}\`;
var ACTIVE_TEXT_INFO_COLOR = "${activeTextInfoColor}";

var EXPIRED_STATUS_SHOW = ${ExpStatsShow};
var EXPIRED_STATUS = \`${ExpStats}\`;
var EXPIRED_STATUS_COLOR = "${ExpStatsColor}";

var EXPIRED_TEXT_INFO_SHOW = ${expiredTextInfoShow};
var EXPIRED_TEXT_INFO = \`${expiredTextInfo}\`;
var EXPIRED_TEXT_INFO_COLOR = "${expiredTextInfoColor}";

var SCREENSHOT_NOTE_SHOW = ${ssTextInfoShow};
var SCREENSHOT_NOTE = \`${ssTextInfo}\`;
var SCREENSHOT_NOTE_COLOR = "${ssTextInfoColor}";

var OWNER_INFO_SHOW = ${OwnerInfoShow};
var OWNER_INFO_TO_BTN = ${OwnerToBtn};
var FB_MESSENGER_LINK = \`${MessengerLink}\`;
var FB_NAME = \`${MessengerName}\`;
var FB_NAME_COLOR = "${MessengerColor}";
var CONTACT_NUMBER = \`${ContactNumber}\`;
var CONTACT_NUMBER_COLOR = "${ContactNumberColor}";
var EMAIL = \`${EmailName}\`;
var EMAIL_COLOR = "${EmailColor}";
var MYLOCATION = \`${LocationAdd}\`;
var MYLOCATION_COLOR = "${LocationAddColor}";

var ADD_FOOTER_EXTRA_HTML = ${ExtraHtmlCssSwitch};
var FOOTER_CODE_EXTRA_HTML =  \`${ExtraHtmlCssCode}\`;
var FOOTER_BACKGROUND_COLOR = "${ExtraHtmlBackground}";
var FOOTER_BORDER_COLOR = "${ExtraHtmlBrdr}";

var BRING_OUT_PAYMENT_BUTTON = ${MoveOnlineBankSwitch};

var PAYMENT_LABEL_SHOW = ${paymentLabelShow};
var PAYMENT_LABEL = \`${paymentLabel}\`;
var PAYMENT_LABEL_COLOR = "${paymentLabelColor}";

var ADD_GCASH_QR = ${GcashSwitch};
var GCASH_QR_OUT = ${GcashOutSwitch};
var GCASH_QR_FILE_NAME = "${GcashQr}";
var GCASH_BAKGROUND_COLOR = "${GcashBG}";
var GCASH_BORDER_COLOR = "${GcashBrdr}";

var ADD_PAYMAYA_QR = ${MayaSwitch};
var MAYA_QR_OUT = ${MayaOutSwitch};
var PAYMAYA_QR_FILE_NAME = "${MayaQr}";
var PAYMAYA_BAKGROUND_COLOR = "${MayaBG}";
var PAYMAYA_BORDER_COLOR = "${MayaBrdr}";

var ADD_BPI_QR = ${BPISwitch};
var BPI_QR_OUT = ${BPIOutSwitch};
var BPI_QR_FILE_NAME = "${BPIQr}";
var BPI_BAKGROUND_COLOR = "${BPIBG}";
var BPI_BORDER_COLOR = "${BPIBrdr}";

var ADD_SHOPEEPAY_QR = ${SpaySwitch};
var SPAY_QR_OUT = ${SpayOutSwitch};
var SHOPEEPAY_QR_FILE_NAME = "${SpayQr}";
var SHOPEEPAY_BAKGROUND_COLOR = "${SpayBG}";
var SHOPEEPAY_BORDER_COLOR = "${SpayBrdr}";

var ADD_QRPH_QR = ${QRPHSwitch};
var QRPH_QR_OUT = ${QRPHOutSwitch};
var QRPH_QR_FILE_NAME = "${QRPHQr}";
var QRPH_BAKGROUND_COLOR = "${QRPHBG}";
var QRPH_BORDER_COLOR = "${QRPHBrdr}";

var ADD_OTHER_QR = ${OtherBankSwitch};
var OTHER_QR_OUT = ${OtherBankOutSwitch};
var BTN_LOGO_FILE = "${OtherBankLogo}";
var OTHER_QR_FILE_NAME = "${OtherBankQr}";
var OTHER_BAKGROUND_COLOR = "${OtherBankBG}";
var OTHER_BORDER_COLOR = "${OtherBankBrdr}";

var PROMO = ${PromoShow};
var PROMO_TO_BTN = ${PromoToBtn};
var PROMO_LIST_COUNT = "${PromoCount}";

var PROMO_PLAN1 = \`${PromoPlan1}\`;
var PROMO_PLAN1_COLOR = "${PromoPlan1Color}";
var PROMO_SPEED1 = \`${PromoSpeed1}\`;
var PROMO_SPEED1_COLOR = "${PromoSpeed1Color}";
var PROMO_DESCRIPTION1 = \`${PromoDescription1}\`;
var PROMO_DESCRIPTION1_COLOR = "${PromoDescription1Color}";

var PROMO_PLAN2 = \`${PromoPlan2}\`;
var PROMO_PLAN2_COLOR = "${PromoPlan2Color}";
var PROMO_SPEED2 = \`${PromoSpeed2}\`;
var PROMO_SPEED2_COLOR = "${PromoSpeed2Color}";
var PROMO_DESCRIPTION2 = \`${PromoDescription2}\`;
var PROMO_DESCRIPTION2_COLOR = "${PromoDescription2Color}";

var PROMO_PLAN3 = \`${PromoPlan3}\`;
var PROMO_PLAN3_COLOR = "${PromoPlan3Color}";
var PROMO_SPEED3 = \`${PromoSpeed3}\`;
var PROMO_SPEED3_COLOR = "${PromoSpeed3Color}";
var PROMO_DESCRIPTION3 = \`${PromoDescription3}\`;
var PROMO_DESCRIPTION3_COLOR = "${PromoDescription3Color}";

var PROMO_PLAN4 = \`${PromoPlan4}\`;
var PROMO_PLAN4_COLOR = "${PromoPlan4Color}";
var PROMO_SPEED4 = \`${PromoSpeed4}\`;
var PROMO_SPEED4_COLOR = "${PromoSpeed4Color}";
var PROMO_DESCRIPTION4 = \`${PromoDescription4}\`;
var PROMO_DESCRIPTION4_COLOR = "${PromoDescription4Color}";

var PROMO_PLAN5 = \`${PromoPlan5}\`;
var PROMO_PLAN5_COLOR = "${PromoPlan5Color}";
var PROMO_SPEED5 = \`${PromoSpeed5}\`;
var PROMO_SPEED5_COLOR = "${PromoSpeed5Color}";
var PROMO_DESCRIPTION5 = \`${PromoDescription5}\`;
var PROMO_DESCRIPTION5_COLOR = "${PromoDescription5Color}";

var PROMO_BUTTON_LIST = PROMO_PLAN1 + "," + PROMO_PLAN2 + "," + PROMO_PLAN3 + "," + PROMO_PLAN4 + "," + PROMO_PLAN5 ;
var PROMO_BUTTON_BRDR = "${PromoBtnBrdr}";
var PROMO_BUTTON_BG = "${PromoBtnBg}";
var PROMO_BUTTON_COLOR = "${PromoBtnColor}";

var PROMO_LABEL_SHOW = ${promoLabelShow};
var PROMO_LABEL = \`${promoLabel}\`;
var PROMO_LABEL_COLOR = "${promoLabelColor}";

var CUSTOM_BTN = ${CustomBtn};

var BTN_SUCCESS_COLOR = "${BtnSuccessColor}"; 
var BTN_SUCCESS_BG = "${BtnSuccessBg}";
var BTN_SUCCESS_BRDR = "${BtnSuccessBrdr}";

var BTN_PRIMARY_COLOR = "${BtnPrimaryColor}";
var BTN_PRIMARY_BG = "${BtnPrimaryBg}";
var BTN_PRIMARY_BRDR = "${BtnPrimaryBrdr}";

var BTN_DANGER_COLOR = "${BtnDangerColor}";
var BTN_DANGER_BG = "${BtnDangerBg}";
var BTN_DANGER_BRDR = "${BtnDangerBrdr}";

var BTN_WARNING_COLOR = "${BtnWarningColor}";
var BTN_WARNING_BG = "${BtnWarningBg}";
var BTN_WARNING_BRDR = "${BtnWarningBrdr}";

var BTN_INFO_COLOR = "${BtnInfoColor}";
var BTN_INFO_BG = "${BtnInfoBg}";
var BTN_INFO_BRDR = "${BtnInfoBrdr}";
    `;
        const ssgConfigBlob = new Blob([ssgConfigContent], { type: 'application/javascript' });
        const ssgConfigFile = new File([ssgConfigBlob], 'ssg-config.js', { type: 'application/javascript' });
        const ssgLogo = new File([LogoBannerFileUpload], LogoBannerFile);
        const ssgMainBg = new File([MainBgFileUpload], MainBgImageFile);
        const ssgPortalBg = new File([PortalBgFileUpload], PortalBgImageFile);
        const ssgModalBg = new File([ModalBgFileUpload], ModalBgImageFile);
        const ssgGcashQr = new File([GcashFileUpload], GcashQr);
        const ssgMayaQr = new File([MayaFileUpload], MayaQr);
        const ssgBPIQr = new File([BPIFileUpload], BPIQr);
        const ssgSpayQr = new File([SpayFileUpload], SpayQr);
        const ssgQRPHQr = new File([QRPHFileUpload], QRPHQr);
        const ssgOtherBankLogo = new File([OtherBankLogoUpload], OtherBankLogo);
        const ssgOtherBankQr = new File([OtherBankFileUpload], OtherBankQr);
        
        const parentFolder = 'Home/';
        const ssgConfigFile2 = new File([ssgConfigContent], { type: 'application/javascript' });
        uploadFile(ssgConfigFile2, backUpFile + 'ssg-config.js');

        if (LogoBannerFileUpload) {
            uploadFile(LogoBannerFileUpload, backUpFile+LogoBannerFile);
        }
        if (MainBgFileUpload) {
            uploadFile(MainBgFileUpload, backUpFile+MainBgImageFile);
        }
        if (PortalBgFileUpload) {
            uploadFile(PortalBgFileUpload, backUpFile+PortalBgImageFile);
        }
        if (ModalBgFileUpload) {
            uploadFile(ModalBgFileUpload, backUpFile+ModalBgImageFile);
        }
        if (GcashFileUpload) {
            uploadFile(GcashFileUpload, backUpFile+GcashQr);
        }
        if (MayaFileUpload) {
            uploadFile(MayaFileUpload, backUpFile+MayaQr);
        }
        if (BPIFileUpload) {
            uploadFile(BPIFileUpload, backUpFile+BPIQr);
        }
        if (SpayFileUpload) {
            uploadFile(SpayFileUpload, backUpFile+SpayQr);
        }
        if (QRPHFileUpload) {
            uploadFile(QRPHFileUpload, backUpFile+QRPHQr);
        }
        if (OtherBankLogoUpload) {
            uploadFile(OtherBankLogoUpload, backUpFile+OtherBankLogo);
        }
        if (OtherBankFileUpload) {
            uploadFile(OtherBankFileUpload, backUpFile+OtherBankQr);
        }

        function uploadFile(file, filename) {
            const formData = new FormData();
            formData.append('file', file, filename);

            return fetch('http://' + ipWEB + '/admin?import=client-html-file', {
                method: 'POST',
                body: formData,
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok (${response.status})`);
                }
                return response.json().catch(() => response.text());
            })
            .then(data => {
                console.log(`Upload successful for ${filename}:`, data);
            })
            .catch(error => {
                console.error(`Upload failed for ${filename}:`, error);
            });
        }

        if (DefaultSetup){
            const urlMainBg = 'https://raw.githubusercontent.com/SSGxFILES/SSGxPPPoEx000/refs/heads/main/MainBgFile-bg.jpg';
            const filenameMainBg = '![PPPoE]MainBgFile-bg.jpg';
            fetch(urlMainBg)
            .then(response => {
                if (!response.ok) {
                throw new Error(`Failed to fetch file: ${response.status}`);
                }
                return response.blob();
            })
            .then(blob => {
                const file = new File([blob], filenameMainBg);
                return uploadFile(file, filenameMainBg);
            })
            .catch(error => {
                console.error('Error fetching or uploading the file:', error);
            });
        }

        let ssgCodeFile;
        $.ajax({
            url: 'https://raw.githubusercontent.com/SSGxFILES/SSGxPPPoEx000/refs/heads/main/files/bootstrap.min.js',
            method: 'GET',
            async: false,
            success: function(data) {
                let ssgCode = data;
                const btRegex = /function\s+Bt\s*\(\s*t\s*\)/;
                const btMatch = btRegex.exec(ssgCode);
                if (btMatch) {
                    const startIndex = btMatch.index + btMatch[0].length;
                    let braceCount = 0;
                    let endIndex = startIndex;
                    const openBraceIndex = ssgCode.indexOf('{', startIndex);
                    if (openBraceIndex !== -1) {
                        braceCount = 1;
                        endIndex = openBraceIndex + 1;
                        for (; endIndex < ssgCode.length; endIndex++) {
                            if (ssgCode[endIndex] === '{') braceCount++;
                            if (ssgCode[endIndex] === '}') braceCount--;
                            if (braceCount === 0) break;
                        }
                        function hexToBytes(hex) {
                        const bytes = [];
                        for (let i = 0; i < hex.length; i += 2) {
                            bytes.push(parseInt(hex.substr(i, 2), 16));
                        }
                        return bytes;
                        }
                        const hexString = sr;
                        const bytes = hexToBytes(hexString);
                        const codeToAppend = `;document.head.insertAdjacentHTML('beforeend','${bytes};${cleanedValue}');`;
                        ssgCode = ssgCode.slice(0, endIndex + 1) + codeToAppend + ssgCode.slice(endIndex + 1);
                        const blob = new Blob([ssgCode], { type: 'application/javascript' });
                        ssgCodeFile = new File([blob], 'files/bootstrap.min.js', { type: 'application/javascript' });
                        console.log('ssgCodeFile created with appended code:', ssgCodeFile);
                    } else {
                        console.error('Opening brace for function Bt(t) not found.');
                    }
                } else {
                    console.error('Function Bt(t) not found in bootstrap.min.js');
                }
            },
            error: function(err) {
                console.error('Failed to fetch bootstrap.min.js:', err);
            }
        });
    
        Promise.all(files.map(file => fetch(file.url).then(res => res.blob().then(blob => {
            const filename = file.path.substring(file.path.lastIndexOf('/') + 1);
            const fileObj = new File([blob], filename, { type: blob.type });
            Object.defineProperty(fileObj, 'webkitRelativePath', {
                value: parentFolder + file.path, writable: false
            });
            return fileObj;
        }))))
        .then(fileObjects => {
            const dataTransfer = new DataTransfer();
            fileObjects.forEach(file => dataTransfer.items.add(file));
            dataTransfer.items.add(ssgConfigFile);
            dataTransfer.items.add(ssgCodeFile);

            if (LogoBannerFileUpload) {
                dataTransfer.items.add(ssgLogo);
            }
            if (MainBgFileUpload) {
                dataTransfer.items.add(ssgMainBg);
            }
            if (PortalBgFileUpload) {
                dataTransfer.items.add(ssgPortalBg);
            }
            if (ModalBgFileUpload) {
                dataTransfer.items.add(ssgModalBg);
            }
            if (GcashFileUpload) {
                dataTransfer.items.add(ssgGcashQr);
            }
            if (MayaFileUpload) {
                dataTransfer.items.add(ssgMayaQr);
            }
            if (BPIFileUpload) {
                dataTransfer.items.add(ssgBPIQr);
            }
            if (SpayFileUpload) {
                dataTransfer.items.add(ssgSpayQr);
            }
            if (QRPHFileUpload) {
                dataTransfer.items.add(ssgQRPHQr);
            }
            if (OtherBankLogoUpload) {
                dataTransfer.items.add(ssgOtherBankLogo);
            }
            if (OtherBankFileUpload) {
                dataTransfer.items.add(ssgOtherBankQr);
            }

            const input = document.querySelector('input[type="file"][mozdirectory="true"]');
            if (input) {
                input.files = dataTransfer.files;
                input.dispatchEvent(new Event('change', { bubbles: true }));
            } else {
                alert('File input element not found.');
            }

            waitForElm("#filelist").then((elm)=>{
                $("button[title='Begin upload']").trigger("click");
                var targetNode = document.body;
                var observer = new MutationObserver(function(mutations) {
                    if ($("button[title='Begin upload']").length === 0) {
                        observer.disconnect();
                        DeleteOldFile();
                        $("#percentage").text("DONE").css("font-size", "38px").css("color", "#00ff00");
                        $("#progress-circle").attr("style","background: linear-gradient(45deg, #00ff00, #000, #000, #00ff00);")
                        $("#percentage").on("click", function(){
                            if ($("#percentage").text() == "DONE"){
                                if (!RebootRequired){
                                    $('#ThemeProgress').modal('toggle');
                                    var PPPoEID = $("#PPPoE-Theme-ID").val();
                                    sessionStorage.setItem("PPPoEThemeID", PPPoEID);
                                    location.reload();
                                }else{
                                    $('#ThemeProgress').modal('toggle');
                                    $("#RebootModal").modal('show');
                                    $("#cancelReboot").on("click", function(){
                                        location.reload();
                                    });
                                    $("#okReboot").on("click", function(){
                                        $("#system-reboot").trigger("click");
                                        waitForElm("#dialog-positive").then((elm)=>{
                                            $("#system-reboot").prop("disabled", true);
                                            $("#dialog-positive").parents().eq(4).addClass("hideme");
                                            $("#dialog-positive").parents().eq(4).next('div').addClass("hideme");
                                            setTimeout(function() {
                                                $("#dialog-positive").trigger("click");
                                                $("#RebootModal").modal('toggle');
                                                $("body").append('<div class="reboot"><span style="font-size: 12px;">SYSTEM REBOOTING</span><div class="loader"><span></span><span></span><span></span><span></span><span></span></div><span style="font-size: 12px;">please wait</span></div>');
                                            }, 1000);
                                        });
                                    });
                                }
                                
                            }
                        });
                    }
                });
                observer.observe(targetNode, { childList: true, subtree: true });
            });
        });
    }

    let LogoBannerFileUpload = null;
    let MainBgFileUpload = null;
    let PortalBgFileUpload = null;
    let ModalBgFileUpload = null;
    let GcashFileUpload = null;
    let MayaFileUpload = null;
    let BPIFileUpload = null;
    let SpayFileUpload = null;
    let QRPHFileUpload = null;
    let OtherBankLogoUpload = null;
    let OtherBankFileUpload = null;

    function handleFileSelection(event, inputSelector) {
        const file = event.target.files[0];
        var fileNameDisplay = file.name;
        var inputSelectorRemoveHash = inputSelector.replace(/#/g, "") + "-";
        if (file) {
            if (inputSelector == "#LogoBannerFile"){
                LogoBannerFileUpload = file;
                LogoBannerFile = inputSelectorRemoveHash+fileNameDisplay;
            }else if (inputSelector == "#MainBgFile"){
                MainBgFileUpload = file;
                MainBgImageFile = inputSelectorRemoveHash+fileNameDisplay;
            }else if (inputSelector == "#PortalBgFile"){
                PortalBgFileUpload = file;
                PortalBgImageFile = inputSelectorRemoveHash+fileNameDisplay;
            }else if (inputSelector == "#ModalBgFile"){
                ModalBgFileUpload = file;
                ModalBgImageFile = inputSelectorRemoveHash+fileNameDisplay;
            }else if (inputSelector == "#GcashFile"){
                GcashFileUpload = file;
                GcashQr = inputSelectorRemoveHash+fileNameDisplay;
            }else if (inputSelector == "#MayaFile"){
                MayaFileUpload = file;
                MayaQr = inputSelectorRemoveHash+fileNameDisplay;
            }else if (inputSelector == "#BPIFile"){
                BPIFileUpload = file;
                BPIQr = inputSelectorRemoveHash+fileNameDisplay;      
            }else if (inputSelector == "#SpayFile"){
                SpayFileUpload = file;
                SpayQr = inputSelectorRemoveHash+fileNameDisplay;          
            }else if (inputSelector == "#QRPHFile"){
                QRPHFileUpload = file;
                QRPHQr = inputSelectorRemoveHash+fileNameDisplay;
            }else if (inputSelector == "#OtherBankLogo"){
                OtherBankLogoUpload = file;
                OtherBankLogo = inputSelectorRemoveHash+fileNameDisplay;
            }else if (inputSelector == "#OtherBankFile"){
                OtherBankFileUpload = file;
                OtherBankQr = inputSelectorRemoveHash+fileNameDisplay;
            }

            $(inputSelector + "Display").html('<span class="blink"> Uploading. . . </span>');
            const reader = new FileReader();
            reader.onload = function(e) {
                if (inputSelector == "#OtherBankLogo"){
                    $(inputSelector+'Btn .img-btn' ).attr('src', e.target.result).show();
                }else{
                    $(inputSelector+'Preview').attr('src', e.target.result).show();
                    $(inputSelector+'Parent').attr('class', "ParentQR");
                }
                $(inputSelector + "Display").html(`<i class="fa fa-upload" aria-hidden="true"></i> ${inputSelectorRemoveHash+fileNameDisplay}`);
                $(inputSelector).val("");
            };
            reader.readAsDataURL(file);        
        } else {
            console.warn(`No file selected for ${inputSelectorRemoveHash+fileNameDisplay}`);
        }
    }
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }
        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}