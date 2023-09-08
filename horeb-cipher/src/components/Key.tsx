import React from 'react'

type Props = {
    keyName: string;
}

const Key = ({ keyName }: Props) => {
    return (
        <div className="key">{keyName}</div>
    )
}

export default Key