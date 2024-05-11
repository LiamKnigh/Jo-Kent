import { gsap } from "gsap"

export default class NavIndicator {
    indicator: HTMLSpanElement
    indicatorVisible: boolean = false
    indicatorDefaults: gsap.TweenVars = {opacity: 0, y: 20}
    indicatorRect: DOMRect

    hoverTimer: number | undefined

    nav: HTMLElement

    constructor (indicator: HTMLSpanElement, nav: HTMLElement) {
        this.indicator = indicator
        this.indicatorRect = this.indicator.getBoundingClientRect()

        this.nav = nav

        // hide indicator
        gsap.set(this.indicator, this.indicatorDefaults)

        this.setupListeners()
    }

    setupListeners () {
        this.nav.addEventListener('mouseover', this.triggerShowIndicator.bind(this))
        this.nav.addEventListener('focusin', this.triggerShowIndicator.bind(this))
        this.nav.addEventListener('mouseleave', this.triggerHideIndicator.bind(this))
        this.nav.addEventListener('focusout', this.triggerHideIndicator.bind(this))
    }

    // get anchor and nav from event
    getElements (e: FocusEvent | MouseEvent) {
        const anchor = e.target as HTMLAnchorElement
        const nav = anchor.closest('nav') as HTMLElement

        return {anchor, nav}
    }

    // start timer so event only triggers if hovered/focused for time
    triggerShowIndicator (e: FocusEvent | MouseEvent) {
        const time = this.indicatorVisible ? 150 : 300
        this.hoverTimer = setTimeout(() => {this.showIndicator(e)}, time)
    }

    // reset the timer then wait then hide the indicator
    triggerHideIndicator (e: FocusEvent | MouseEvent) {
        clearTimeout(this.hoverTimer)
        setTimeout(() => {this.hideIndicator(e)}, 500)
    }

    showIndicator (e: FocusEvent | MouseEvent) {
        if (!e.target || (e.target as HTMLElement).nodeName.toLowerCase() == 'nav') return

        const {anchor, nav} = this.getElements(e)

        const anchorRect = anchor.getBoundingClientRect()
        const navRect = nav.getBoundingClientRect()

        // calculate new x (anchors midpoint relative to viewport)(take of nav to make relative to nav)(take of half the indicator to center)
        const indicatorX = (anchorRect.x + (anchorRect.width / 2)) - navRect.x - (this.indicatorRect.width / 2)

        let start: gsap.TweenVars = {}
        let end: gsap.TweenVars = {}

        if (this.indicatorVisible) {
            // move sideways
            end = {opacity: 1, y: 0, x: indicatorX}
        } else {
            if (!gsap.isTweening(this.indicator)) {
                // set start point to bottom, unless already moving (that means its going up already)
                start = {...this.indicatorDefaults, x: indicatorX}
            }
            // move up
            end = {opacity: 1, y: 0, x: indicatorX}
        }

        gsap.killTweensOf(this.indicator) // makes it a bit smoother
        gsap
            .to(this.indicator, {
                ...end,
                startAt: start,
                duration: .5,
                ease: 'back.out',
            })
            .then(() => this.indicatorVisible = true)
    }

    hideIndicator (e: FocusEvent | MouseEvent) {
        if (!e.target) return
        const {nav} = this.getElements(e)

        // if we're still hovered/focused but on a different anchor don't go down
        if (!e.relatedTarget || (nav !== e.relatedTarget && !nav.contains(e.relatedTarget as Node))) {
            this.indicatorVisible = false
            gsap
                .to(this.indicator, {
                    ...this.indicatorDefaults,
                    duration: .5,
                    ease: 'power4.in',
                })
        }
    }
}