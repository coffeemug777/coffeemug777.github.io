import React from 'react'
import ReactDOM from 'react-dom'
import data from '../files/data.json'

// portfolio component, returns a list of div. Depending on the type, php or website.
class PortfolioItem extends React.Component {
	render() {
		let itemList = null 

		// iterate the array using map function, and construct a bunch of divs
		if(this.props.type == 'php'){
			itemList = this.props.data.map((tItem, i)=>{
								return 	<div className="listItem" key={"php-" + i}>
											<h3>{tItem.title}</h3>
											<img src={tItem.imgUrl} />
											<p>{tItem.description}</p>
										</div>
							})
		} else {
			itemList = this.props.data.map((tItem, i)=>{
								return 	<div className="listItem" key={"website-" + i}>
											<a href={tItem.url}><img src={tItem.imgUrl} /></a>
										</div>
							})
		}

		// return the bunch of divs wrapped with another div for easier handling and styling
		return	<div className={this.props.type + "-items"}>
					{itemList}
				</div>	
	}
}

// portfolio component/page, render the portfolio HTML, and PortfolioItem component, by passing data (JSON), whether its php, or website.
// data is retrieved from /files/data.json
class Portfolio extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tabIndex: 0
		}
	}

	changeTabs(i) {
		this.setState({
			tabIndex: i
		})
	}

	render () {
		return 	<div className="portfolio">
					<h1>Portfolio</h1>
					<p>Below are some samples of my finished projects.</p>
					<div className="tabItem">
						<h2>PHP</h2>
						<p>Screenshots of my PHP web applications are listed below. <strong><em>Source code and demo available on request.</em></strong></p>
						<PortfolioItem data={data.php} type="php" />
					</div>

					<div className="tabItem">
						<h2>Websites</h2>
						<p>Screenshots of websites I finished are listed below. <strong><em>Click</em></strong> on the images to go to the live websites.</p>
						<PortfolioItem data={data.website} type="website" />	            
					</div>
				</div>
	}
}

// the about component/ page, rendering pure HTML, nothing fancy
class About extends React.Component {
	render () {
		return 	<div className="about-me">
					<h1>About Me</h1>
					<div className="polaroid">
						<img src="images/denny.png" className="myImage" />
						<p>Prasetyo Denny Wibowo</p>
					</div>
					<p>Currently based in Philadelphia, I have over 8 years of experience in Web Development. I build websites from the early stage of designing the mockup to the final phases of the website's deployment.</p>
					<p>With my programming background I have built customized websites that requires me to code, from simple wordpress templates to using PHP Framework such as CodeIgniter and Laravel.</p>
					<p>I always keep myself updated with today's web technology, all the while thinking outside the box to create something unique for every project that I'm working on.</p>
					<p>As a hardworker and team player, I work closely with the client directly and thrive in a team environment.</p>
					<button className="btn btn-primary" href="mailto:indocoffee@gmail.com">Contact</button>
				</div>
	}
}

// Nav component, just rendering menu items, and handle on click. If about and portfolio, pass on above to Home component, else just an a tag click.
class Nav extends React.Component {
	render () {
		return <ul className="nav">
				<li onClick={() => {this.props.onLiClick('about')}}>About</li>
				<li onClick={() => {this.props.onLiClick('portfolio')}}>Portfolio</li>
				<li><a href="files/resume.pdf">Resume</a></li>
				<li><a href="mailto:indocoffee@gmail.com">Contact</a></li>
			</ul>
	}
}

// default component class, Home, the top root component
export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			currentPage: 'about'
		}
		// bind the changepage method, for lexical this 
		this.changePage = this.changePage.bind(this)
	}

	// change page, by changing the currentPage state
	changePage(pageName) {
		this.setState({currentPage: pageName})
	}

	render() {
		// if currentPage about or portfolio, render the about or portfolio component
		let currentPage = null;

		switch(this.state.currentPage) {
			case 'about':currentPage = <About /> 
			break;
			case 'portfolio':currentPage = <Portfolio /> 
			break;
			default:
				break;
		}

		// pass along the changepage method on the Nav component, so we can change the currentPage state from the ground up
		return 	<div>
					<Nav onLiClick={this.changePage} />
					{currentPage}
				</div>
	}
}

//final render 
ReactDOM.render(
	<Home />, 
	document.getElementById('root')
);