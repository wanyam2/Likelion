import { messaging } from './firebaseConfig';

// 권한 요청 및 FCM 토큰 가져오기
export const requestPermissionAndGetToken = async () => {
    try {
        await messaging.requestPermission();
        const token = await messaging.getToken();
        console.log('FCM Token:', token);
        // 서버에 토큰 전송 로직 추가
        return token;
    } catch (error) {
        console.error('Error getting permission or token:', error);
    }
};

// 알림 수신 및 처리
export const setupNotificationListener = () => {
    messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
        // 사용자에게 알림 표시
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
            icon: payload.notification.icon,
        };

        new Notification(notificationTitle, notificationOptions);
    });

    // 알림 클릭 시 로그 남기기 (선택 사항)
    messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
        // 기상 로그 기록 API 호출
        // 예: axios.post('/api/log-wakeup/', { timestamp: new Date() });
    });
};
