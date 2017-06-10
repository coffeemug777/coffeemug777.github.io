import React from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import data from '../files/data.json'

// portfolio component, an item inside a div. Depending on the type, php or website.
class PortfolioItem extends React.Component {
	render() {
		let itemHTML = null 

		let min = 0
		let max = 3
		
		let index = Math.floor(Math.random() * (max - min + 1)) + min
		let polaroidClass = 'polaroid grey rotate-' + index
		let parentClass = (this.props.type == 'php' ? 'php-item' : 'website-item')
		let description = this.props.data.description
		let imgTag = <a href={this.props.data.url}><img src={this.props.data.imgUrl} /></a>

		// check if description is an array
		if ( Array.isArray(description) ) 
			description = description.map((descItem, tindex) => <p key={tindex}>{descItem}</p>) 
		else 
			description = <p>{this.props.data.description}</p>

		if(this.props.type == 'php')
			imgTag = <img src={this.props.data.imgUrl} />

		itemHTML = 	<div className={parentClass}>
						<div className={polaroidClass}>
							{imgTag}
							<h3>{this.props.data.title}</h3>
						</div>
						{description}
					</div>		

		return itemHTML
	}
}

// portfolio component/page, render the portfolio HTML, and PortfolioItem component, by passing data (JSON), whether its php, or website.
// data is retrieved from /files/data.json
class Portfolio extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tabIndex: 1, // tab index, php or website
			websiteIndex: 0, // website index, which item to be shown
			phpIndex: 0, // php index, which item to be shown
			phpMax: data.php.length - 1, // phpMax, how many items are in the list
			websiteMax: data.website.length - 1 // website, how may items are in the list
		}
	}

	// change state tabIndex, on tab click 
	changeTabs(i) {
		this.setState({
			tabIndex: i
		})
	}

	// change state websiteIndex or phpIndex, on arrow prev/next click
	changeIndex(dir) {
		// change state of phpIndex, prev/or next
		if(this.state.tabIndex == 0) {
			if(dir == 'left') {
				if (this.state.phpIndex > 0)
					this.setState({
						phpIndex: this.state.phpIndex - 1
					});
				else
					this.setState({
						phpIndex: this.state.phpMax
					});

			} else {
				if (this.state.phpIndex < this.state.phpMax )
					this.setState({
						phpIndex: this.state.phpIndex + 1
					});
				else
					this.setState({
						phpIndex: 0
					});
			}
		} 

		// change state of websiteIndex, prev/or next
		else {
			if(dir == 'left') {
				if (this.state.websiteIndex > 0)
					this.setState({
						websiteIndex: this.state.websiteIndex - 1
					});
				else
					this.setState({
						websiteIndex: this.state.websiteMax
					});

			} else {
				if (this.state.websiteIndex < this.state.websiteMax )
					this.setState({
						websiteIndex: this.state.websiteIndex + 1
					});
				else
					this.setState({
						websiteIndex: 0
					});
			}
		}


	}

	render () {

		let tabContent = null;

		// show wchich content, if tabIndex = 0, then its php, else its website
		switch(this.state.tabIndex) {
			case 0:
				tabContent = 	<div className="tabContent">
									<p>Screenshots of my PHP web applications are listed below. <strong><em>Source code and demo available on request.</em></strong></p>
									<PortfolioItem data={data.php[this.state.phpIndex]} type="php" />
								</div>
			break;

			case 1:
				tabContent = 	<div className="tabContent">
									<p>Screenshots of websites I finished are listed below. <strong><em>Click</em></strong> on the images to go to the live websites.</p>
									<PortfolioItem data={data.website[this.state.websiteIndex]} type="website" />	            
								</div>
			break;
			default:
				break;
		}

		return 	<div className="portfolio">
					<h1>Portfolio</h1>
					<p>Below are some samples of my finished projects.</p>

					<div className="tabContainer">
						<ul className="tabControls">				
							<li onClick={() => {this.changeTabs(1)}} className={this.state.tabIndex == 0 ? 'not-active':''}>Websites with CMS</li>
							<li onClick={() => {this.changeTabs(0)}} className={this.state.tabIndex == 1 ? 'not-active':''}>PHP custom solutions</li>
						</ul>

						{tabContent}

						<span onClick={() => {this.changeIndex('left')}} className="prev fa fa-chevron-circle-left"></span>
						<span onClick={() => {this.changeIndex('right')}} className="next fa fa-chevron-circle-right"></span>
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
					<a className="btn btn-primary" href="mailto:indocoffee@gmail.com">Contact</a>
				</div>
	}
}

// Nav component, just rendering menu items, and handle on click. If about and portfolio, pass on above to Home component, else just an a tag click.
class Nav extends React.Component {
	render () {
		return <ul className="nav">
				<li onClick={() => {this.props.onLiClick('about')}} className={this.props.currentPage == 'about'? 'active': ''}>About</li>
				<li onClick={() => {this.props.onLiClick('portfolio')}} className={this.props.currentPage == 'portfolio'? 'active': ''}>Portfolio</li>
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
//			currentPage: 'portfolio'
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
			case 'about':currentPage = <About key="about" /> 
			break;
			case 'portfolio':currentPage = <Portfolio key="portfolio" /> 
			break;
			default:
				break;
		}

		// pass along the changepage method on the Nav component, so we can change the currentPage state from the ground up
		return 	<div>
					<Nav onLiClick={this.changePage} currentPage={this.state.currentPage} />
					<div className="page-container">
						<ReactCSSTransitionGroup
							transitionName="changepage"
							transitionEnterTimeout={500}
							transitionLeaveTimeout={0}>
							{currentPage}
						</ReactCSSTransitionGroup>					
					</div>
				</div>
	}
}

//final render 
ReactDOM.render(
	<Home />, 
	document.getElementById('root')
);