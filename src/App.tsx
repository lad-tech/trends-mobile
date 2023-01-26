import React from 'react';
import logo from './logo512.png';
import './App.css';
import {Radar} from "./components/Radar";
import technologiesJSON from './technologies.json';

interface ITechnologies {
  [category: string]: {
    [name: string]: {
      points: number[]
      link: string
    }
  }
}

let technologies = technologiesJSON as ITechnologies

const allTechnologies: string[] = [];
const allCurrentPoints: number[] = [];
const allTrendsPoints: number[] = [];

Object.keys(technologies).forEach(type => {
  Object.keys(technologies[type]).forEach(technology => {
    allTechnologies.push(technology);
    allCurrentPoints.push(technologies[type][technology].points[0]);
    allTrendsPoints.push(technologies[type][technology].points[1] || technologies[type][technology].points[0]);
  })
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className={"App-header-text"}>Mobile Trends</div>
        <div className={"App-logo-container"}>
          <img src={logo} className="App-logo" alt="logo"/>
        </div>
      </header>

      <div className={"App-content"}>
        {
          Object.keys(technologies).map((type, index) => (
            <article key={index}>
              <table border={1}>
                <thead>
                <tr>
                  <th colSpan={3}>{type}</th>
                </tr>
                <tr>
                  <th><strong>Name</strong></th>
                  <th>
                    <strong>Current</strong>
                  </th>
                  <th>
                    <strong>Trend</strong>
                  </th>
                </tr>
                </thead>

                <tbody>
                {Object.keys(technologies[type]).map((technology, index) => {
                  const linkedTechnology = technologies[type][technology].link ?
                    <a href={technologies[type][technology].link}>{technology}</a> :
                    technology;
                  return (
                    <tr key={index}>
                      <td>{linkedTechnology}</td>
                      <td>{technologies[type][technology].points[0]}</td>
                      <td>{technologies[type][technology].points[1]}</td>
                    </tr>);
                })}
                </tbody>
              </table>
              <Radar
                categories={Object.keys(technologies[type])}
                series={[
                  {
                    name: 'Current',
                    data: Object.keys(technologies[type]).map(technology => technologies[type][technology].points[0])
                  },
                  {
                    name: 'Trends',
                    data: Object.keys(technologies[type]).map(technology => technologies[type][technology].points[1] || technologies[type][technology].points[0])
                  },
                ]}
              />
            </article>
          ))
        }

        <h2>All Trends</h2>
        <Radar
          height={700}
          categories={allTechnologies}
          series={[
            {
              name: 'Current',
              data: allCurrentPoints
            },
            {
              name: 'Trends',
              data: allTrendsPoints
            },
          ]}
        />
      </div>

    </div>
  );
}

export default App;
