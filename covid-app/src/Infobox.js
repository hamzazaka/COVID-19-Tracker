import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'

export default function Infobox({title,cases,active,isRed,total,...props}) {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--Red'}`}>
            <CardContent>
                <Typography className='infoBox__title' color="textSecondary">
                    {title}
                </Typography>

                <h2 className='infoBox__cases'>{cases}</h2>

                <Typography className='infoBox__total'  color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}
