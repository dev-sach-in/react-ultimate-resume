import React, { useCallback, useMemo, useState } from 'react';

import { createUseStyles, useTheme } from 'react-jss';
import { animated, useSpring, useTransition } from 'react-spring';

import { CenterContentContainer } from '../../../../commons/center_content_container/center_content_container';
import { LoadingSpinner } from '../../../../commons/loading_spinner/loading_spinner';

import { LOADING_SPINNER_TRANSITIONS } from './soundtrack_back_loading_spinner_transitions';

import { getColorsFromCardVariant } from '../../../../../utils/styles/styles_utils';
import { useCardVariant } from '../../../../commons/profile_card/profile_card_hooks/use_card_variant';

import { styles } from './soundtrack_back_styles';

const useStyles = createUseStyles(styles);

const SoundtrackBackComponent = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [variant] = useCardVariant();

    const { components: { cards: { height, width } } } = theme;

    const [hasLoaded, setHasLoaded] = useState(false);

    const color = useMemo(() => getColorsFromCardVariant(theme, variant).color, [theme, variant]);

    const handleLoad = useCallback(() => setHasLoaded(true), []);
    const iframeSpringProps = useSpring({
        opacity: hasLoaded ? 1 : 0
    });

    const loadingSpinnerTransitions = useTransition(
        hasLoaded,
        item => `${item ? 'invisible' : 'visible'}_loading_soundtrack_spinner`,
        { ...LOADING_SPINNER_TRANSITIONS, unique: true }
    );

    return (
        <CenterContentContainer customClasses={{ container: classes.container }}>
            <span className={classes.loadingSpinnerContainer}>
                {loadingSpinnerTransitions.map(({ item, key, props }) => !item && (
                    <animated.span
                        key={key}
                        className={classes.loadingSpinnerChild}
                        style={props}
                    >
                        <LoadingSpinner color={color} />
                    </animated.span>
                ))}
            </span>
            <animated.iframe
                className={classes.iframe}
                title="Soundtrack"
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DWWl7MndYYxge"
                height={height}
                width={width}
                frameBorder="0"
                allow="encrypted-media"
                onLoad={handleLoad}
                style={iframeSpringProps}
            />
        </CenterContentContainer>
    );
};

export const SoundtrackBack = SoundtrackBackComponent;