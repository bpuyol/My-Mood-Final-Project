import React, { useContext, useEffect, useState, useCallback } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/choose-mood.css";
import { Col, Container, Row, Button } from "react-bootstrap";


export const ChooseMood = () => {
    const { store, actions } = useContext(Context);
    const [mood, setMood] = useState({ normal: "", leve: "", moderado: "", severo: "", extremo: "" });
    const [divStyles, setDivStyles] = useState([]);
    const navigate = useNavigate();


    const handleMoodClick = async (moodId) => {
        const result = await actions.updateUserMood(store.user?.id, moodId);
        if (result) {
            navigate('/day-mood');
        } else {
            console.error('Failed to update mood');
        }
    };

    useEffect(() => {
        const fetchMoods = async () => {
            try {
                const result = await actions.getAllMoods();
                if (result && result.results) {
                    const moodTypes = ['Normal', 'Leve', 'Moderado', 'Severo', 'Extremo'];
                    const updatedMood = moodTypes.reduce((acc, type) => {
                        const moodTypeResults = result.results[type];
                        acc[type.toLowerCase()] = moodTypeResults && moodTypeResults.length > 0 ? moodTypeResults[Math.floor(Math.random() * moodTypeResults.length)] : '';
                        return acc;
                    }, {});

                    setMood(updatedMood);
                    calculateStyles(updatedMood);
                }

            } catch (error) {
                console.error('Error al obtener las frases de los estados de ánimo:', error);
            }
        };
        fetchMoods();
    }, []);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const isColorDark = (color) => {
        const r = parseInt(color.substr(1, 2), 16);
        const g = parseInt(color.substr(3, 2), 16);
        const b = parseInt(color.substr(5, 2), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance < 0.5;
    };

    const calculateStyles = (mood) => {
        if (mood) {
            const newStyles = Object.keys(mood).map((key, index) => {
                const backgroundColor = getRandomColor();
                const color = isColorDark(backgroundColor) ? 'white' : 'black';
                return {
                    backgroundColor,
                    color,
                    position: 'relative',
                    width: '100%',
                    padding: '20px',
                    marginTop: index === 0 ? '120px' : '20px',
                    opacity: 0,
                    animation: `fadeIn 1s ${index * 0.5}s forwards`
                };
            });
            setDivStyles(newStyles);
        }
    };

    if (!store.user || Object.keys(store.user).length === 0) {
        return null;
    }


    return (
        <Container fluid className="container-landingpage">
            <Container className="mt-5">
                <Row>
                    <Col lg={4} md={12} xs={12} className="d-flex text-center align-items-center justify-content-center ">
                        <h1>Hola {store.user?.name}<br /> ¿Cómo te sientes hoy?</h1>
                    </Col>
                    <Col lg={8} md={12} xs={12} id="body-mood">
                        <div className="container-choose-mood">
                            {Object.keys(mood).map((key, index) => (
                                <button
                                    key={index}
                                    className="dynamic-content"
                                    id={`div${index + 1}`}
                                    style={divStyles[index] || {}}
                                    onClick={() => handleMoodClick(mood[key].mood_id)}
                                >
                                    {mood[key].mood}
                                </button>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}
export default ChooseMood;

