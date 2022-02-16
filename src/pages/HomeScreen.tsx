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

  const uploadAudioAsync = (uri) => {
    console.log('Uploading' + uri);
    const apiUrl = 'http://ten5vabackend-env.eba-mca4g3he.us-east-1.elasticbeanstalk.com/api/v1/audio/upload';
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    const formData = new FormData();
    formData.append('title', 'canción');
    formData.append('description', 'probando canción');
    formData.append('wave_file', {
      uri,
      name: `recording.${fileType}`,
      type: `audio/x-${fileType}`,
    });

    const options = {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    console.log('POSTing' + uri + 'to' + apiUrl);
    return fetch(apiUrl, options);
  }

  return (
    <Box>
      <VStack space="4" divider={<Divider />}>
        <Button
          onPress={() => onStartRecord()}
        >
          RECORD
        </Button>
        <Button
          onPress={() => onStopRecord()}
        >
          STOP
        </Button>
        <Divider />
        <Button mode="contained" icon="play" onPress={() => onStartPlay()}>
          PLAY
        </Button>
        <Button
          onPress={() => onPausePlay()}
        >
          PAUSE
        </Button>
        <Button
          onPress={() => onStopPlay()}
        >
          STOP
        </Button>
      </VStack>
    </Box>
  );
};

export default HomeScreen;

