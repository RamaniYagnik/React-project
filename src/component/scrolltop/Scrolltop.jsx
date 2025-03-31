import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Scrolltop = () => {
    const { pathname } = useLocation()
    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0,0)
        },0)
    },[pathname])
    return null
}

export default Scrolltop