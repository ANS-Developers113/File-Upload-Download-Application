import React from 'react';
import axios from 'axios';
import {Table} from 'react-bootstrap';
import { Button,Modal, Row, Col, Container } from 'react-bootstrap';
import FileSaver from 'file-saver';

import {Tabledata} from './tabledata';
import data from './Modal.json';

class FileUpload extends React.Component{

  constructor(props) {
		super(props);

		this.onFileChange = this.onFileChange.bind(this);
		this.onSubmitUpload = this.onSubmitUpload.bind(this);
		this.onSubmitDownload=this.onSubmitDownload.bind(this);

		this.state = {
			file: '',
			fileDownloading:'',
			showHide : false,
			filename : ''
		}
	}

	//Modal enable/disable
	handleModalShowHide(e, data) {
		this.setState({ showHide : !this.state.showHide })
		this.setState({ filename : data });
    }

	//Change the name of file
	onFileChange(e) {
			this.setState({ file: e.target.files[0] })
  	}
  
	// Upload the file to database
  	onSubmitUpload(e, data) {
		e.preventDefault();

		const formData = new FormData()
		formData.append('filename', data);
		formData.append('file', this.state.file);
		
		axios.post("http://localhost:3000/upload", formData,)
		.then(res=>{
			alert("File uploaded successfully");	
		});
	}

	// To Download file from database
	onSubmitDownload(e){
		e.preventDefault();
		let downloadFilename = this.state.filename;

		axios({
			method: "GET",
			url: "http://localhost:3000/download",
			responseType: "blob",
			params: {
				'file' : this.state.filename
			}
		}).then(response => {
			this.setState({ fileDownloading: true }, () => {

				FileSaver.saveAs(response.data, downloadFilename);
				console.log(response);
			});
		}).then(() => {
			this.setState({ fileDownloading: false });
			console.log("File Downloading Completed");
		});	
	}

  	render(){
		const mystyle = {
			color: "blue",
		};

		return(
			<div className="container">
				<Table striped bordered hover size="sm">
					<thead>
						<tr>
							<th>File Name</th>
							<th>File Choose</th>
							<th>File Upload</th>
						</tr>
					</thead>

					<tbody>
						{Tabledata.map((data, key) => {
							return (
								<tr key={key}>
									{
										<>
											<td>
												<div style={mystyle} onClick={((e) => this.handleModalShowHide(e, data.file_name))}>
													{
														data.file_name
													}
												</div>
											</td>
											<td>
												<input type="file" onChange={ this.onFileChange } />
											</td>
											<td>
												<form onSubmit={((e) => this.onSubmitUpload(e, data.file_name))}>
													<div className="form-group">
														<button className="btn btn-primary" type="submit">Upload</button>
													</div>
												</form>
											</td>
										</>
									}
								</tr>
							);
						})}
					</tbody>
				</Table>
						
				<Modal show={this.state.showHide}  size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
					
					<Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
						<Modal.Title>Document name</Modal.Title>
					</Modal.Header>
					
					<Modal.Body>
						<Container>
							<Row>
								<Col>
									{data.map((labeldata, key)=>{
										return (<Row key={key}><h6>{labeldata.Label}</h6></Row>)
									})}
								</Col>
								
								<Col>
									<Row>
										16/6/2020 5:00pm
									</Row>
									
									<Row>
										Submitted
									</Row>

									<Row>
										<textarea type="text" rows="3" cols="80"></textarea>
									</Row>
								</Col>
								
								<Col/>
							</Row>
						</Container>
					</Modal.Body>
						
					<Modal.Footer>
						<Button variant="secondary" onClick={() => this.handleModalShowHide()}>
							Close
						</Button>
						
						<Button variant="primary" onClick={((e) => this.onSubmitDownload(e))}>
							Download
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
    	);
  	}
}

export default FileUpload;