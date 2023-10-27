import { Box, Button, HStack } from "@chakra-ui/react";

import { Heading, Image, Text, VStack } from "@chakra-ui/react";
// import img from "../assets/player2.jpeg";
import {
    GiPreviousButton,
    GiNextButton,
    GiPlayButton,
    GiPauseButton,
} from "react-icons/gi";
import useSound from "use-sound";
import { useState, useEffect } from "react";

/* 
    imports songs and 

*/
import aud1 from "../assets/audio/aud1.mp3";
import photo1 from "../assets/player.jpeg";
import aud2 from "../assets/audio/aud2.mp3";
import photo2 from "../assets/player1.jpeg";
import aud3 from "../assets/audio/aud3.mp3";
import photo3 from "../assets/player2.jpeg";

const data = [
    {
        src: aud1,
        photo: photo1,
        author: "Emily Dell",
        name: "In your house",
        index: 0,
    },
    {
        src: aud2,
        photo: photo2,
        author: "Latina",
        name: "Hallowen",
        index: 1,
    },
    {
        src: aud3,
        photo: photo3,
        author: "Joker",
        name: "In Gotham",
        index: 2,
    },
];

const Player = () => {
    const [currSong, setCurrSong] = useState(data[1]);
    console.log(currSong);
    const [isPlaying, setIsplaying] = useState(false);
    const [time, setTime] = useState({
        min: "",
        sec: "",
    });
    const [currTime, setCurrTime] = useState({
        min: "",
        sec: "",
    });

    const [seconds, setSeconds] = useState();
    const [play, { pause, duration, sound }] = useSound(currSong.src);

    const handleTogglePlay = () => {
        if (isPlaying) {
            pause();
            setIsplaying(false);
        } else {
            play();
            setIsplaying(true);
        }
    };

    const handlePrevious = () => {
        if (currSong.index > 0) {
            pause();
            setCurrSong(data[currSong.index - 1]);
            setIsplaying(false);
        } else {
            pause();
            setIsplaying(false);
            setCurrSong(data[currSong.index]);
        }
    };

    const handleNext = () => {
        if (currSong.index < 2) {
            pause();
            setCurrSong(data[currSong.index + 1]);
            setIsplaying(false);
        } else {
            pause();
            setCurrSong(data[currSong.index]);
        }
    };

    useEffect(() => {
        if (duration) {
            const sec = duration / 1000;
            const min = Math.floor(sec / 60);
            const secRemain = Math.floor(sec % 60);
            setTime({
                min: min,
                sec: secRemain,
            });
        }
    }, [isPlaying]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([]));
                const min = Math.floor(sound.seek([]) / 60);
                const sec = Math.floor(sound.seek([]) % 60);
                setCurrTime({
                    min,
                    sec,
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [sound]);

    return (
        <Box
            maxW={"container.md"}
            h={"100vh"}
            // border={"1px solid black"}
            // background={"inherit"}
            margin={"auto"}
            paddingTop={"20"}
        >
            <VStack
                w={"80%"}
                h={"fit-content"}
                padding={"10"}
                margin={"auto"}
                // paddingTop={"18vh"}
                border={"5px solid #fff"}
                borderRadius={"20px"}
            >
                <Image
                    src={currSong.photo}
                    borderRadius={"16px"}
                    width={"90%"}
                    margin={"auto"}
                    height={"80%"}
                    border={"2px solid white"}
                />
                <VStack
                    marginLeft={"auto"}
                    marginRight={"auto"}
                    marginTop={"4"}
                >
                    <Heading color={"white"}>{currSong.name}</Heading>
                    <Text color={"whiteAlpha.400"}>{currSong.author}</Text>
                </VStack>

                <VStack
                    w={"90%"}
                    marginLeft={"auto"}
                    marginRight={"auto"}
                    marginTop={"10"}
                >
                    <HStack w={"100%"} justifyContent={"space-between"}>
                        {" "}
                        <Text color={"whiteAlpha.600"}>
                            {currTime.min}:{currTime.sec}
                        </Text>
                        <Text color={"whiteAlpha.600"}>
                            {time.min}:{time.sec}
                        </Text>
                    </HStack>
                    <div style={{ width: "100%" }}>
                        <input
                            type="range"
                            min="0"
                            max={duration / 1000}
                            default="0"
                            value={seconds}
                            className="timeline"
                            onChange={(e) => {
                                sound.seek([e.target.value]);
                            }}
                            style={{ width: "100%" }}
                        />
                    </div>
                </VStack>
                <HStack
                    marginLeft={"auto"}
                    marginRight={"auto"}
                    marginTop={"10"}
                >
                    <Button
                        variant={"blackAlpha"}
                        _hover={{ transform: "scale(1.1)" }}
                        color={"whiteAlpha.800"}
                        onClick={handlePrevious}
                        disabled={currSong.index >= 2}
                    >
                        <GiPreviousButton size={"lg"} />
                    </Button>
                    {!isPlaying ? (
                        <Button
                            variant={"blackAlpha"}
                            _hover={{ transform: "scale(1.1)" }}
                            marginLeft={"5"}
                            marginRight={"5"}
                            onClick={handleTogglePlay}
                            color={"whiteAlpha.800"}
                        >
                            <GiPlayButton size={"lg"} />
                        </Button>
                    ) : (
                        <Button
                            variant={"blackAlpha"}
                            _hover={{ transform: "scale(1.1)" }}
                            marginLeft={"5"}
                            marginRight={"5"}
                            onClick={handleTogglePlay}
                            color={"whiteAlpha.800"}
                        >
                            <GiPauseButton size={"lg"} />
                        </Button>
                    )}

                    <Button
                        variant={"blackAlpha"}
                        _hover={{ transform: "scale(1.1)" }}
                        color={"whiteAlpha.800"}
                        onClick={handleNext}
                        disabled={currSong.index >= 2}
                    >
                        <GiNextButton size={"lg"} />
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );
};

export default Player;
