gsap.to('.box', { //to means initial to final
    x: 600,
    duratio: 3,
    delay: 1,
    rotate: 360,
    backgroundColor: 'purple',
    borderRadius:50
})

gsap.from('.text h1' ,{
    y:50,
    opacity:0,
    stagger:0.3
})
