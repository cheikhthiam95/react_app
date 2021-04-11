import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import { Button } from './Button';

const InfoSection = () => {
    const sectionData = useSelector(state => state.sectionReducer);
   
    const Section = styled.section`
    width: 100%;
    height: 100%;
    `;

    const Container = styled.div`
    padding: 3rem calc((100vw - 1300px) /2);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 800px

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
    }
    `;

    const ColunmLeft = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    line-height: 1.4;
    padding: 1rem 2rem;
    order: ${({ reverse}) => (reverse ? '1' : '2')};

    h1 {
        margin-bottom: 1rem;
        font-size: clamp(1.5rem, 6vw, 2rem);
    }

    p {
        margin-bottom: 2rem;
    }
    `;

    const ColumnRight = styled.div`
    padding: 1rem 2rem;
    order: ${({ reverse }) => (reverse ? '1' : '2' )};

    display:flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 768px) {
        order: ${({ reverse}) => (reverse ? '2' : '1')};
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;

        @media screen and (max-width: 768px) {
            width: 90%;
            height: 90%;
        }
    }
    `;

    if(!Array.isArray(sectionData) || sectionData.length <= 0) {
        return null;
    }
   
    return (
       <Section>
        {sectionData.map((section, index) => {
            if(section.reverse === true) {
                 return (
                    <Container>
                        <ColunmLeft>
                            <h1 key={index}>{section.titre}</h1>
                            <p key={index}>{section.paragraph}</p>
                            
                        </ColunmLeft>
                        <ColumnRight reverse>
                            <img src={section.picture} alt='home' key={index}/>
                        </ColumnRight>
                    </Container> 
                )
            } else if (section.reverse === false) {
                return (
                    <Container>
                        <ColunmLeft>
                            <h1 key={index}>{section.titre}</h1>
                            <p key={index}>{section.paragraph}</p>
                            
                            <Button to="/home" >Accueil</Button>
                        </ColunmLeft>
                        <ColumnRight >
                            <img src={section.picture} alt='home' key={index}/>
                        </ColumnRight>
                    </Container> 
                )
            }
               
        })}
        </Section>
    )
}

export default InfoSection
