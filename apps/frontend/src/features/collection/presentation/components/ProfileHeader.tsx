import React from 'react';

import '../styles/profile-header.css';

type Props = {
    coverPictureUrl: string;
    profilePictureUrl: string;
}

export default function ProfileHeader(props: Props) {
    return (
        <div
            className={'ProfileHeader CoverPicture'}
            style={{
                backgroundImage: `url("${props.coverPictureUrl}")`,
            }}
        >
            <div
                className={'ProfilePicture'}
                style={{
                    backgroundImage: `url("${props.profilePictureUrl}")`,
                }}
            />
        </div>
    )
}
