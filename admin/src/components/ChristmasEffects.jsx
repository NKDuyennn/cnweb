import { useEffect, useState } from 'react';
import santaSleighGif from '../assets/santa-sleigh.gif';
import './ChristmasEffects.css';

const ChristmasEffects = () => {
    const [snowflakes, setSnowflakes] = useState([]);

    useEffect(() => {
        // Tạo 50 bông tuyết với vị trí và tốc độ ngẫu nhiên
        const flakes = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            animationDuration: 5 + Math.random() * 10,
            animationDelay: Math.random() * 5,
            fontSize: 10 + Math.random() * 20,
            opacity: 0.3 + Math.random() * 0.7
        }));
        setSnowflakes(flakes);
    }, []);

    return (
        <div className="christmas-effects">
            {/* Tuyết rơi */}
            <div className="snow-container">
                {snowflakes.map((flake) => (
                    <div
                        key={flake.id}
                        className="snowflake"
                        style={{
                            left: `${flake.left}%`,
                            animationDuration: `${flake.animationDuration}s`,
                            animationDelay: `${flake.animationDelay}s`,
                            fontSize: `${flake.fontSize}px`,
                            opacity: flake.opacity
                        }}
                    >
                        ❄
                    </div>
                ))}
            </div>

            {/* Tuần lộc chạy - GIF Animation */}
            <div className="reindeer-container">
                <div className="santa-sleigh-gif">
                    <img src={santaSleighGif} alt="Santa Sleigh with Reindeer" />
                </div>
            </div>
        </div>
    );
};

export default ChristmasEffects;
