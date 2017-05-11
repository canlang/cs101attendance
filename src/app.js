import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Avatar from 'material-ui/Avatar'
import FileFolder from 'material-ui/svg-icons/file/folder'
import FontIcon from 'material-ui/FontIcon'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import groupBy from 'lodash/groupBy'
import forEach from 'lodash/forEach'

injectTapEventPlugin();


import {
  blue300,
  indigo900,
  indigo200,
  orange200,
  deepOrange100,
  deepOrange300,
  pink400,
  purple500,
  lightBlue300,
  lightBlue500,
  teal500,
  lime100,
  transparent,
  blueGrey50,
  pinkA200,
} from 'material-ui/styles/colors'

const style = {margin: 5};
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};


export default class App extends React.Component {
	constructor(props) {
		super()
		this.state = {
			students: props.students,
		}
		this.socket = props.socket
		// this._handleTouchTap = this._handleTouchTap.bind(this)
	}
	componentDidMount() {
		this.socket.on('server msg', (student)=>this.changeStudentState(student))
	}
	render () {
		return (
			<MuiThemeProvider>
			<div>
				<StudentList students={this.state.students} 
				onTouchTap={(student)=>this._handleTouchTap(student)}
				/>
			</div>
			</MuiThemeProvider>
		)
	}
	changeStudentState(student) {
		// console.log(student)
		const students = this.state.students.filter(function(el) {
			if (el.s_id == student.s_id) {
				el.attendance = !el.attendance
			}
			return el
		})
		this.setState({students: students})
	}
	_handleTouchTap(student) {
		// const students = this.state.students.slice()
		// console.log(students.findIndex(student))
		// this.removeStudent(student)
		this.socket.emit('client msg', student)
	}
}
function StudentList(props) {
	const groupStudentList = groupBy(props.students,(student)=>student.s_id.toString().substring(2,4))
	const newList = []

	forEach(groupStudentList,function(value,key){
		const students = value.map((student) =>
		!student.attendance?
		<ListItem
			leftAvatar={groupStudentList[key][0].s_id==student.s_id?<Avatar
				color={lightBlue500}
		        backgroundColor={blueGrey50}
		        size={40}
		        style={style}>
		        {student.s_id.toString().substring(2,4)}
		        </Avatar>:null
      		}
      insetChildren={true}
			onTouchTap={props.onTouchTap.bind(this,student)}
			key={student.s_id.toString()}
			primaryText={student.name}
			secondaryText={student.s_id}
		/>:
		<ListItem
			leftIcon={<ActionFavorite color={pinkA200}/>}
			rightAvatar={<Avatar 
      	src={"img/pngs/avatar-0"+(student.s_id%9+1)+".png"} 
      	backgroundColor={pinkA200}
      	/>}
      onTouchTap={props.onTouchTap.bind(this,student)}
      key={student.s_id.toString()}
      primaryText={student.name}
      secondaryText={student.s_id}
		/>
	)
		newList.push(<List key={key}><Divider inset={true}/>{students}</List>)
	})


	const studentList = props.students.map((student) =>
		!student.attendance?
		<ListItem
			leftAvatar={<Avatar
				color={lightBlue500}
		        backgroundColor={blueGrey50}
		        size={40}
		        style={style}>
		        {student.s_id.toString().substring(2,4)}
		        </Avatar>
      		}
			onTouchTap={props.onTouchTap.bind(this,student)}
			key={student.s_id.toString()}
			primaryText={student.name}
			secondaryText={student.s_id}
		/>:
		<ListItem
			leftIcon={<ActionFavorite color={pinkA200}/>}
			rightAvatar={<Avatar 
      	src={"img/pngs/avatar-0"+(student.s_id%9+1)+".png"} 
      	backgroundColor={pinkA200}
      	/>}
      onTouchTap={props.onTouchTap.bind(this,student)}
      key={student.s_id.toString()}
      primaryText={student.name}
      secondaryText={student.s_id}
		/>
	)
	// console.log(studentList)
	// console.log(newList)
	return (
		<div>
		{newList}
		</div>
	)
}
