const bgCount = $("bg").children.length
let scrollHeight
let scrollPart

let menu_bages = $("menu_bages")
let header_body = $("header_body")
let currSection

const sections = document.querySelectorAll('section')
window.addEventListener("resize", onResize);
function onResize() {
    scrollHeight = document.body.scrollHeight - document.body.clientHeight
    scrollPart = scrollHeight / bgCount
    onScroll()
}
onResize()


// Scroll
document.addEventListener("scroll", onScroll)

function onScroll() {

    let scrollY = window.scrollY;
    // Change Lines position
    if (scrollY > 150) {
        header_body.style.transition = "0.5s";
        header_body.style.width = "850px"
        header_row.style.position = "absolute"

        menu_bages.style.transition = "0.3s";
        menu_bages.style.opacity = 0
    } else {
        header_body.style.transition = "0.5s";
        header_body.style.width = "1200px"
        header_row.style.position = "static"

        menu_bages.style.transition = "0.3s";
        menu_bages.style.opacity = 1
    }


    if (window.innerWidth < 1200) {
        header_body.style.width = "100%"
        menu_bages.style.opacity = 1
        header_row.style.position = "static"
        header_body.style.height = "max-content"
    } else {
        header_body.style.height = "61px"
    }


    for (let i = 2; i <= bgCount; i++) {
        const currBg = $("bg" + i)
        let startPos = scrollPart * (i - 2)
        let opacity = (scrollY - startPos) / scrollPart
        if (opacity <= 0) {
            opacity = 0

        }
        if (opacity > 1) {
            opacity = 1

        }
        currBg.style.opacity = opacity
    }

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        let sectionId = current.getAttribute("id");


        if (
            scrollY > sectionTop &&
            scrollY <= sectionTop + sectionHeight &&
            currSection != sectionId
        ) {
            //console.log(sectionId)
            currSection = sectionId
            //window.location.hash = sectionId
            // document.querySelector('[data-menu-item="'+sectionId+'"]').classList.toggle("active")
            // document.querySelectorAll("[data-menu-item].active").forEach((item) => {
            //     if (item.dataset.menuItem != sectionId) {
            //         item.classList.remove("active");
            //     }

            // });
        }
    });


};

function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    document.querySelectorAll("[data-menu-item].active").forEach((item) => {
            item.classList.remove("active");
    })
}




// Change URL



// Stage Click
document.addEventListener("click", onClick)
function onClick(e) {
    let btn = e.target.matches("[data-menu-item]")

    if (btn) {
        btn = e.target
        window.location.href = "#" + btn.dataset.menuItem
        btn.classList.toggle("active")

        document.querySelectorAll("[data-menu-item].active").forEach((item) => {
            if (item == btn) return;
            item.classList.remove("active");
        });
    }
}

function $(id) {
    return document.getElementById(id)
}
