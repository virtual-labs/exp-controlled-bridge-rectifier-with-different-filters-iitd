const sliders = {
    slider_V_value: 0,
    v: document.querySelector(".v .value-box input"),
    v_knob: document.querySelector(".slider-V-arrow"),
    slider_D_value: Number(document.querySelector(".slider_D").value),
    d: document.querySelector(".d .slider_D"),
    d_max:90,

    sliderV(afterClickCallback=null){
        let sliderArrow = document.querySelector(".slider-V-arrow")
        let sliderValueInput = document.querySelector(".v .value-box input")
        let minAngle = 0
        let maxAngle = 332
        let angleDifference = 29.8
        let angles = minAngle
        let minValue = 0
        let maxValue = 220
        let valueDifference = 1
        let value = minValue
        let singleClickDiff = 20
        let doubleClickDiff = 20

        function incrementAngleAndValue(isDoubleClick = false){
            if(isDoubleClick){
                angles = angles + angleDifference + (20 * 1.5)
                if(angles > maxAngle){
                    angles = minAngle
                }

                value = value + doubleClickDiff
                if(value > maxValue){
                    value = minValue
                }
            }else{
                angles = angles + angleDifference 
                if(angles > maxAngle){
                    angles = minAngle
                }

                value = value + singleClickDiff
                if(value > maxValue){
                    value = minValue
                }
            }

        }
        
        // slider function on single click 
        let rotateArrowSingleClick = (rot=0)=>{
            incrementAngleAndValue()
            sliderArrow.style.transform=`rotate(${angles}deg)`
            console.log(value)
            sliderValueInput.value = value
        }


        // * for input value
        const slideInput = ()=>{
            let val = Number(sliderValueInput.value)
            if(val > maxValue){
                val = maxValue
            }
            if(val >= 50){
                angles = val * 1.5
                sliderArrow.style.transform=`rotate(${angles}deg)`
                sliderValueInput.value = val
                value = val
                console.log("val:",val)
            }
        }

        sliderValueInput.onkeyup = slideInput
        sliderValueInput.addEventListener("focusout",()=>{
            if(sliderValueInput.value < minValue){
                sliderValueInput.value = minValue
            }
            slideInput()
        })
        
        sliderArrow.onclick = ()=>{
            rotateArrowSingleClick()
            // ! call back for arrow etc
            if(afterClickCallback)
                afterClickCallback()
        }
    },
    sliderD(){
        let slider_D = document.querySelector(".slider_D")
        let sliderImg = document.querySelector(".slider-D-arrow")
        let sliderValueInput = document.querySelector(".d .value-box input")
        let val = 0
        
        // slider function  
        function slide(e){
            e = e instanceof Event
            if(e){
                sliderValueInput.value = slider_D.value 
            }
            else{
                slider_D.value = sliderValueInput.value
            }
            val = ((slider_D.value * 114) / 130 * 2)
            sliderImg.style.left = `${-114 + val}px`

            // ! update the text accroding to value
            if(Scenes.currentStep == 9 || Scenes.currentStep == 10 || Scenes.currentStep == 11){
                let betaTempText = Scenes.items.tempTitle41
                let first = 183.6
                let second = 194.1
                let load_1 = 100
                let betaDeg = (values.R == load_1 ? first : second)
                if(slider_D.value <= 30){
                    betaDeg = 180
                }
                betaTempText.setContent(betaDeg)
            }
            // ! update slider details according to wave form
            if(Scenes.currentStep == 4){
                if(slider_D.value==30){
                    sliderImg.style.left = "114px"
                }
                if(slider_D.value==90){
                    sliderImg.style.left = "185.44px"
                }
                if(slider_D.value==150){
                    sliderImg.style.left = "258px"
                }
            }
        }
    
        const slideInput = ()=>{
            let val = sliderValueInput.value
            if(val > this.d_max){
                val = this.d_max
            }
            sliderValueInput.value = val
            slide(false)
        }
    
        slider_D.oninput = slide
        sliderValueInput.onkeyup = slideInput
        sliderValueInput.addEventListener("focusout",()=>{
            if(sliderValueInput.value < 0 || sliderValueInput.value.length == 0){
                sliderValueInput.value = 0
            }
            slide(false)
        })
    },
    init(){
        this.sliderV()
        this.sliderD()
    },
    resetSlidersValue(){
        document.querySelector(".slider-D-arrow").style.left = "-114px"
        sliders.d.min = "0"
        sliders.d.max = this.d_max
        sliders.d.step = "1"
        sliders.d.value = 1 
        document.querySelector(".d .value-box input").value = sliders.d.value
        document.querySelector(".d .value-box input").readOnly = false

        document.querySelector(".slider-V-arrow").style.transform=`rotate(${0}deg)`
        document.querySelector(".v .value-box input").value = 0
    },
    showAllSliders(){
        let sliders = document.querySelectorAll(".slider .slider-box")
        sliders.forEach((ele)=>{
            ele.style.display = "block"
        })
    },
    showAll(){
        let sliderBox = document.querySelector(".universal-slider")
        sliderBox.style.display = "block"
    },
    hideAll(){
        let sliderBox = document.querySelector(".universal-slider")
        sliderBox.style.display = "none"
    },
    showSlider(sliderName="",second=""){
        this.showAll()
        let sliders = document.querySelectorAll(".slider .slider-box")
        sliders.forEach((ele)=>{
            ele.style.display = "none"
        })
        document.querySelector(`.slider .${sliderName}`).style.display = "block"
        if(second!="")
            document.querySelector(`.slider .${second}`).style.display = "block"
    },
    hideSlider(sliderName=""){
        this.showAll()
        // document.querySelector(".slider-circuit").style.display = "none"
        let sliders = document.querySelectorAll(".slider .slider-box")
        sliders.forEach((ele)=>{
            ele.style.display = "block"
        })
        document.querySelector(`.slider .${sliderName}`).style.display = "none"
    }
}

sliders.init()



/*
use it like showSlider(sliderName)
like: d, v, r -> only those sliders are visible

and for all visible call
sliders.showAll()
*/