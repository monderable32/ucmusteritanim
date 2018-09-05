import React, { Component } from 'react'
import { Form, FormGroup, FormControl, InputGroup, Button, Col, Glyphicon } from 'react-bootstrap'
//import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

export default class UcMusteriTanim extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
        this.handleEnded = this.handleEnded.bind(this);
        this.makeCorsRequest = this.makeCorsRequest.bind(this);
        this.createCORSRequest = this.createCORSRequest.bind(this);
        this.callMusteriApi = this.callMusteriApi.bind(this);
        this.state = {
            musteri: null,
            musteriNo : ''
        };
    }


    callMusteriApi(musteriNo)
    {
        fetch("http://10.206.112.41:8092/musteri-tanim/info/" + musteriNo, { method: "GET" })
        .then(response => response.json())
        .then(

            (result) => {
                //  debugger

                this.setState({ musteri: result.responseObject });
                this.props.MusteriInfoDelegate(result.responseObject);
               // console.log(result);
            },
            (error) => {
                //debugger
               // console.log(error);
            }
        ).catch(callback => console.log("catch " + callback));
    }
    handleChange(e) {


        this.setState({ musteriNo: e.target.value });
       
    }

    handleEnded(e) {

        if (e.which === 13 || e.which === 9) {

           this.callMusteriApi(e.target.value);
        }
    }

    createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {

            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.open(method, url, true);

        } else if (typeof XDomainRequest !== "undefined") {

            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new XDomainRequest();
            xhr.open(method, url);

        } else {

            // Otherwise, CORS is not supported by the browser.
            xhr = null;

        }
        return xhr;
    }

    makeCorsRequest() {
        // This is a sample server that supports CORS.
        var url = 'http://10.206.112.41:8092/musteri-tanim/info/1';

        var xhr = this.createCORSRequest('GET', url);
        if (!xhr) {
            alert('CORS not supported');
            return;
        }

        // Response handlers.
        xhr.onload = function () {
            var text = xhr.responseText;
            alert('Response from CORS request to ' + text);
        };

        xhr.onerror = function () {
            alert('Woops, there was an error making the request.');
        };

        xhr.send();
    }
    render() {
        return (
            <Form inline>
                <FormGroup >

                    <FormControl style={{ width: 120 }}
                        inputMode="number"
                        type="number"
                        value={this.state.musteriNo}
                        onChange={this.handleChange}
                        onKeyDown={this.handleEnded}

                    />

                    <InputGroup>
                        <FormControl
                            disabled={true}
                            value={this.state.musteri ? this.state.musteri.kisaIsim : ''}



                        />
                        <InputGroup.Button>
                            <Button onClick = {()=>this.callMusteriApi(this.state.musteriNo)}> <Glyphicon glyph="search" /></Button>
                        </InputGroup.Button>

                    </InputGroup>

                </FormGroup>
            </Form>
        );
    }
}


UcMusteriTanim.propTypes = {
    MusteriInfoDelegate: PropTypes.func
}/*
ReactDOM.render(
    <UcMusteriTanim MusteriInfoDelegate={(musteri)=>{console.log("Musteri Kisa Ismi:", musteri.kisaIsim)}}/>,
    document.getElementById('root')
);*/