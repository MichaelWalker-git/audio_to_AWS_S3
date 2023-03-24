import React, {useEffect, useState, useRef} from "react";
import axios from "axios";

const App = () => {
    const [sourceLanguage, setSourceLanguage] = useState('en');
    const [targetLanguage, setTargetLanguage] = useState('es');
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [audioContext, setAudioContext] = useState();
    const [recorderInput, setRecorderInput] = useState();
    const [recorder, setRecorder] = useState();
    const [getUserMediaStream, setGetUserMediaStream] = useState<MediaStream>();
    const [isRecordButtonDisabled, setIsRecordButtonDisabled] = useState(false);
    const [isStopButtonDisabled, setIsStopButtonDisabled] = useState(true);
    const mediaRecorder = useRef(null);
    const audioStream = useRef(null);

    const constraints = {audio: true, video: false};

    useEffect(() => {
        // navigator.mediaDevices.getUserMedia(constraints).then(function(stream: MediaStream) {
        //     setGetUserMediaStream(stream);
        //     setRecorderInput(audioContext?.createMediaStreamSource(stream));
        //     // Create Recorder.js object and start recording
        //     setRecorder(new Recorder(recorderInput, { numChannels: 1 }));
        //     recorder?.record();
        // }).catch(function(err) {
        //     alert(err);
        //     resetView();
        //     alert("....Recording failed, try using Firefox or local copy of the app from your machine.");
        // });
    }, []);

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         isblocked: false,
    //         blobUrl: '',
    //         isrecording: false,
    //         audio: ''
    //     }
    //     this.start = this.start.bind(this);
    //     this.stop = this.stop.bind(this);
    //     this.handleaudiofile = this.handleaudiofile.bind(this);
    // }
    // componentDidUpdate() {
    //     navigator.getUserMedia({audio: true, video: false},
    //         () => {
    //             console.log('Permission Granted');
    //             this.setState({isblocked: false});
    //         },
    //         () => {
    //             console.log('Permission Denied');
    //             this.setState({isblocked: true})
    //         },
    //     );
    // }
    //
    // start = () => {
    //
    //     if (this.state.isblocked) {
    //         console.log('permission Denied');
    //     } else {
    //         audioRecorder.start()
    //             .then(() => {
    //                 this.setState({
    //                     isrecording: true
    //                 });
    //             }).catch((e) => console.log(e));
    //     }
    // };
    //
    // stop = () => {
    //     audioRecorder
    //         .stop()
    //         .getMp3()
    //         .then(([buffer, blob]) => {
    //             const blobUrl = URL.createObjectURL(blob)
    //             this.setState({blobUrl, isrecording: true});
    //             const d = new Date();
    //             const file = new File([blob], d.valueOf(), {type: "audio/wav"});
    //             console.log(file);
    //             this.handleaudiofile(file);
    //         }).catch((e) => console.log('We could not retrieve your message'));
    // };
    //
    // handleaudiofile(ev) {
    //     let file = ev;
    //     let fileName = ev.name;
    //     let fileType = ev.type;
    //     axios.post("http://localhost:5000/sign_s3", {
    //         fileName: fileName,
    //         fileType: fileType
    //     })
    //         .then(response => {
    //             const returnData = response.data.data.returnData;
    //             const signedRequest = returnData.signedRequest;
    //             const url = returnData.url;
    //             const options = {
    //                 headers: {
    //                     'Content-Type': fileType,
    //                 }
    //             };
    //             axios.put(signedRequest, file, options)
    //                 .then(result => {
    //                     this.setState({
    //                         audio: url,
    //                     }, () => console.log(this.state.audio))
    //                     alert("audio uploaded")
    //                 })
    //                 .catch(error => {
    //                     alert("ERROR " + JSON.stringify(error));
    //                 })
    //         })
    //         .catch(error => {
    //             alert(JSON.stringify(error));
    //         })
    // }

    const handleClickableImage = (source: string, language: string) => {
        unselectSource();
        selectLanguage(source, language);
    }

    const selectLanguage = (mode: string, language: React.SetStateAction<string>) => {
        if (mode === 'source') {
            setSourceLanguage(language);
        } else {
            setTargetLanguage(language);
        }
    };

    const unselectSource = () => {
        // ...
    };

    const unselectTarget = () => {
        // ...
    };

    function urlExists(url: string) {
        const http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status === 200;
    }


    const generateRequestId = () => {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    }

    const startRecording = async () => {
        // try {
        //     const stream = await navigator.mediaDevices.getUserMedia(
        //         { audio: true }
        //     );
        //
        //     if(stream){
        //         audioStream.current = stream;
        //     }
        //     mediaRecorder.current = new MediaRecorder(stream);
        //     mediaRecorder.current.addEventListener('dataavailable', (e) => {
        //         setAudioURL(URL.createObjectURL(e.data));
        //     });
        //     mediaRecorder.current.start();
        //     setIsRecording(true);
        // } catch (err) {
        //     console.error('Error starting recording:', err);
        // }
    };

    function processingView() {
        // Show processing message
        setIsProcessing(true);

        // Disable all buttons
        setIsRecordButtonDisabled(true);
        setIsStopButtonDisabled(true);

    }

    function recordingView() {
        setIsProcessing(false);
        // Disable all buttons
        setIsRecordButtonDisabled(true);
        setIsStopButtonDisabled(false);
    }

    function resetView() {
        setIsProcessing(false);
        setIsRecordButtonDisabled(false);
        setIsStopButtonDisabled(true);
    }

    // const startRecording = () => {
    //     setAudioContext(new AudioContext);
    //
    //     // Adjust buttons and message for recording
    //     recordingView();
    //
    //     // Define constraints object for MediaStream
    //     const constraints = {audio: true, video: false};
    //
    //     // Access MediaDevices to get audio stream
    //     navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    //         setGetUserMediaStream(stream);
    //         setRecorderInput(audioContext.createMediaStreamSource(stream));
    //         // Create Recorder.js object and start recording
    //         recorder.record()
    //     }).catch(function(err) {
    //         alert(err);
    //         // Reset buttons and message in case of failure
    //         resetView();
    //         // Inform user that recording failed (most likely was blocked by browser due
    //         // to insecure origin)
    //         alert("....Recording failed, try using Firefox or local copy of the app from your machine.");
    //     });
    // }

    const stopRecording = () => {
        // // Reset buttons and message
        // resetView();
        //
        // // Stop recording with Recorder.js object
        // recorder.stop();
        //
        // // Stop microphone and get recorded audio
        // getUserMediaStream.getAudioTracks()[0].stop();
        //
        // // Pass blob with audio data to callback
        // recorder.exportWAV(uploadAudioRecording)
    };

    const uploadAudioRecording = (blob: any) => {
        // Show processing phase in the UI
        processingView();

        const requestId = generateRequestId();

        const inputKey = 'input/' + requestId + '.mp3';

        // s3.upload({
        //     Key: inputKey,
        //     Body: blob
        // }, function(err, data) {
        //     if (err) {
        //         return alert('There was an error uploading your recording: ', err.message);
        //     } else {
        //
        //         const lambda = new AWS.Lambda({region: awsRegion, apiVersion: '2015-03-31'});
        //         const input = {
        //             FunctionName: lambdaFunction,
        //             InvocationType: 'RequestResponse',
        //             LogType: 'None',
        //             Payload: JSON.stringify({
        //                 "bucket": bucketName,
        //                 "key": inputKey,
        //                 "sourceLanguage": source_language,
        //                 "targetLanguage": target_language
        //             })
        //         };
        //
        //         lambda.invoke(input, function(err, data) {
        //             if (err) {
        //                 console.log(err);
        //                 alert("There was a problem with Lambda function!!! ");
        //             } else {
        //                 const resultUrl = data.Payload.replace(/['"]+/g, '');
        //                 resetView();
        //                 document.getElementById('audio-output').innerHTML = '<audio controls autoplay><source src="' + resultUrl + '" type="audio/mpeg"></audio><br/>';
        //             }
        //         });
        //     }
        // });
    };


        return (
        <>
            {/*<button onClick={this.start} disabled={this.state.isrecording} type="button">Start</button>*/}
            {/*<button onClick={this.stop} type="button">Stop</button>*/}
            {/*<audio src={this.state.blobUrl} controls="controls"/>*/}
            <div className="app">
                <br/><img src="https://s3.amazonaws.com/tomash-us-east-1/voice-translator/graphics/logo.png"
                          alt={"logo"}
                          height="80"/>
            </div>

            <div className="app">
                Select Source Language<br/><br/>
                <div id="wrapper">
                    <div className="flags">
                        <img id="source_en"
                             className='clickableimage'
                             src="https://s3.amazonaws.com/tomash-us-east-1/voice-translator/graphics/flags/en2.png"
                             height="100"
                             onClick={() => handleClickableImage('source', 'en')}/>
                        <br/>US <br/>English
                    </div>
                    <div className="flags"><img id="source_es"
                                                alt={"es"}
                                                className='clickableimage'
                                                src="https://s3.amazonaws.com/tomash-us-east-1/voice-translator/graphics/flags/es.png"
                                                height="100"
                                                onClick={() => handleClickableImage('source','es')}/>
                        <br/>US <br/>Spanish
                    </div>
                    <br/><br/>
                </div>
            </div>

            <div className="app">
                Select Target Language<br/><br/>
                <div id="wrapper">
                    <div className="flags">
                        <img id="target_en"
                             alt={"en"}
                             className='clickableimage'
                             src="https://s3.amazonaws.com/tomash-us-east-1/voice-translator/graphics/flags/en.png"
                             height="100"
                             onClick={() => handleClickableImage('target','en')}/><br/>US <br/>English
                    </div>
                    <div className="flags">
                        <img id="target_gb"
                             alt={"gb"}
                             className='clickableimage'
                             src="https://s3.amazonaws.com/tomash-us-east-1/voice-translator/graphics/flags/gb.png"
                             height="100"
                             onClick={() => handleClickableImage('target','gb')}/><br/>British <br/>English
                    </div>
                    <div className="flags">
                        <img id="target_de"
                             alt={"de"}
                             className='clickableimage'
                             src="https://s3.amazonaws.com/tomash-us-east-1/voice-translator/graphics/flags/de.png"
                             height="100"
                             onClick={() => handleClickableImage('target','de')}/><br/>German<br/>&nbsp;
                    </div>
                    <div className="flags">
                        <img id="target_pl"
                             alt={"pl"}
                             className='clickableimage'
                             src="https://s3.amazonaws.com/tomash-us-east-1/voice-translator/graphics/flags/pl.png"
                             height="100"
                             onClick={() => handleClickableImage('target','pl')}/><br/>Polish<br/>&nbsp;
                    </div>
                    <div className="flags">
                        <img id="target_es"
                             alt={"es"}
                             className='clickableimage'
                             src="https://s3.amazonaws.com/tomash-us-east-1/voice-translator/graphics/flags/es2.png"
                             height="100"
                             onClick={() => handleClickableImage('target','es')}/><br/>US <br/>Spanish
                    </div>
                    <div className="flags">
                        <img id="target_ca"
                                alt={"ca"}
                             className='clickableimage'
                             src="https://s3.amazonaws.com/tomash-us-east-1/voice-translator/graphics/flags/ca.png"
                             height="100" 
onClick={() => handleClickableImage('target','ca')}/><br/>Canadian<br/>French
                    </div>
                    <div className="flags">
                        <img id="target_fr"
                             alt={"fr"}
                             className='clickableimage'
                             src="https://s3.amazonaws.com/tomash-us-east-1/voice-translator/graphics/flags/fr.png"
                             height="100"
                             onClick={() => handleClickableImage('target','fr')}/><br/>French<br/>&nbsp;
                    </div>
                    <div className="flags">
                        <img id="target_ja"
                             alt={"ja"}
                             className='clickableimage'
                             src="https://s3.amazonaws.com/tomash-us-east-1/voice-translator/graphics/flags/ja.png"
                             height="100" 
onClick={() => handleClickableImage('target','ja')}/><br/>Japanese<br/>&nbsp;
                    </div>
                    <div className="flags">
                        <img id="target_ru"
                             alt={"ru"}
                             className='clickableimage'
                             src="https://s3.amazonaws.com/tomash-us-east-1/voice-translator/graphics/flags/ru.png"
                             height="100" 
onClick={() => handleClickableImage('target','ru')}/>
                        <br/>Russian<br/>&nbsp;
                    </div>
                    <div className="flags">
                        <img id="target_it"
                             alt={"it"}
                             className='clickableimage'
                             src="https://s3.amazonaws.com/tomash-us-east-1/voice-translator/graphics/flags/it.png"
                             height="100"
                             onClick={() => handleClickableImage('target','it')}/>
    <br/>Italian<br/>&nbsp;
                    </div>
                    <div className="flags">
                        <img id="target_sv"
                             className='clickableimage'
                             src="https://s3.amazonaws.com/tomash-us-east-1/voice-translator/graphics/flags/sv.png"
                             height="100"
                             onClick={() => handleClickableImage('target','sv')}/>
    <br/>Swedish<br/>&nbsp;
                    </div>
                </div>
            </div>
            <br/><br/><br/>
            <div className="app">
                <div id="babel_button">
                    <img id="start_button"
                         className='clickableimage'
                         src="https://s3.amazonaws.com/tomash-us-east-1/voice-translator/graphics/start.png"
                         height="50"
                         onClick={startRecording}/>
                    <img id="stop_button"
                         src="https://s3.amazonaws.com/tomash-us-east-1/voice-translator/graphics/stop2.png"
                         height="50"
                         onClick={stopRecording}/>
                </div>
            </div>

            <span id="processing">Processing...</span>
            <div id="audio-output"></div>

    <button onClick={startRecording} disabled={isRecording}>
    Start Recording
    </button>
    <button onClick={stopRecording} disabled={!isRecording}>
    Stop Recording
    </button>
        </>
    )
}

export default App;