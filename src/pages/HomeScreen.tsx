import React, { useEffect, useRef } from 'react';
import { Card, Button, VStack, Box, Divider } from 'native-base';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';

const HomeScreen = () => {
  const playerRef = useRef(null);
  const path = Platform.OS === 'android' ? `${RNFetchBlob.fs.dirs.CacheDir}/hello.mp3` : 'hello.m4a';

  useEffect(() => {
    playerRef.current = new AudioRecorderPlayer();
    playerRef.current.setSubscriptionDuration(0.1);
  }, []);

  const onStartRecord = async () => {
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    const uri = await playerRef.current.startRecorder(path, audioSet);
    // playerRef.current.addRecordBackListener((e) => {
    //   console.log('onstartRecordE', e)
    // });
    await uploadAudioAsync(uri);
    console.log('uri', uri);
  };

  const onStopRecord = async () => {
    const result = await playerRef.current.stopRecorder();
    playerRef.current.removeRecordBackListener();
    console.log('stopRecord', result);
  };

  const onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await playerRef.current.startPlayer(path);
    const volume = await playerRef.current.setVolume(1.0);
    console.log(`file: ${msg}`, `volume: ${volume}`);
    // playerRef.current.addPlayBackListener((e) => {
    //   console.log('onstartPlayE', e);
    // });
  };

  const onPausePlay = async () => {
    await playerRef.current.pausePlayer();
  };

  const onStopPlay = async () => {
    console.log('onStopPlay');
    playerRef.current.stopPlayer();
    playerRef.current.removePlayBackListener();
  };

  const uploadAudioAsync = async (uri) => {
    console.log('Uploading' + uri);
    const newUri = uri.replace(/([^:]\/)\/+/g, "$1");
    console.log('newUri', newUri);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDU3MTYzNDAsInN1YiI6IjM0IiwidHlwZSI6ImFjY2VzcyJ9.XBKxmjSsB1Kc5kXN87DLYi7FI5GIXEyob9eJBT0o8-k');
    myHeaders.append('Accept', 'application/json')
    myHeaders.append('Content-Type', 'multipart/form-data')
    const apiUrl = 'https://ten5backend.jrtec-test.ml/api/v1/audio/upload:3000';
    // const uriParts = newUri.split('.');
    // const fileType = uriParts[uriParts.length - 1];

    const formData = new FormData();
    formData.append('title', 'canción');
    formData.append('description', 'probando canción');
    formData.append('wave_file', {
      uri: newUri,
      name: 'hello.mp3',
      type: 'audio/acc'
    });

    const options = {
      method: 'POST',
      body: formData,
      headers: myHeaders,
    };

    console.log('POSTing' + newUri + 'to' + apiUrl);
    fetch(apiUrl, options)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  return (
    <Box>
      <VStack space="4" divider={<Divider />}>
        <Button onPress={() => onStartRecord()}>RECORD</Button>
        <Button onPress={() => onStopRecord()}>STOP</Button>
        <Divider />
        <Button onPress={() => onStartPlay()}>PLAY</Button>
        <Button onPress={() => onPausePlay()}>PAUSE</Button>
        <Button onPress={() => onStopPlay()}>STOP</Button>
      </VStack>
    </Box>
  );
};

export default HomeScreen;

