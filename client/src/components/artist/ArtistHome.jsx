import React, { Component, useState } from 'react';
import { ArtistSidebar } from './Sidebar';
import { ArtistProfile } from './Profile';
import { ArtistAblumView } from './ArtistAblumView';
import { ArtistSongView } from './ArtistSongView';



export function ArtistHome(props = "") {
    const [display, setDisplay] = useState(props)
    const [loading, setLoading] = useState(true)

    function GetDisplay() {
        setLoading(false)
        switch (display) {
            case 'profile':
                return <ArtistProfile />;
            case 'album':
                return <ArtistAblumView />;
            case 'song':
                return <ArtistSongView />;
            default:
                return <></>;
        }
    }
        return (
            <>
                <div className='artist-home-layout'>
                    <ArtistSidebar onMenuItemClick={setDisplay} />
                </div>
                <div>
                    <GetDisplay />
                </div>
            </>
        )

    };