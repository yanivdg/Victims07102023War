import {
  isPlatformBrowser
} from "./chunk-PVP7C4DS.js";
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  NgModule,
  NgZone,
  Output,
  PLATFORM_ID,
  ViewChild,
  ViewEncapsulation$1,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵloadQuery,
  ɵɵqueryRefresh,
  ɵɵviewQuery
} from "./chunk-RXRC473I.js";
import {
  fromEventPattern
} from "./chunk-2UXUBMH3.js";
import "./chunk-KUOPV5YS.js";
import {
  BehaviorSubject,
  Observable,
  Subject,
  of,
  switchMap,
  takeUntil
} from "./chunk-UB6C7KF6.js";

// node_modules/@angular/youtube-player/fesm2022/youtube-player.mjs
var _c0 = ["youtubeContainer"];
var DEFAULT_PLAYER_WIDTH = 640;
var DEFAULT_PLAYER_HEIGHT = 390;
var _YouTubePlayer = class _YouTubePlayer {
  /** Height of video player */
  get height() {
    return this._height;
  }
  set height(height) {
    this._height = height || DEFAULT_PLAYER_HEIGHT;
  }
  /** Width of video player */
  get width() {
    return this._width;
  }
  set width(width) {
    this._width = width || DEFAULT_PLAYER_WIDTH;
  }
  constructor(_ngZone, platformId) {
    this._ngZone = _ngZone;
    this._destroyed = new Subject();
    this._playerChanges = new BehaviorSubject(void 0);
    this._height = DEFAULT_PLAYER_HEIGHT;
    this._width = DEFAULT_PLAYER_WIDTH;
    this.disableCookies = false;
    this.ready = this._getLazyEmitter("onReady");
    this.stateChange = this._getLazyEmitter("onStateChange");
    this.error = this._getLazyEmitter("onError");
    this.apiChange = this._getLazyEmitter("onApiChange");
    this.playbackQualityChange = this._getLazyEmitter("onPlaybackQualityChange");
    this.playbackRateChange = this._getLazyEmitter("onPlaybackRateChange");
    this._isBrowser = isPlatformBrowser(platformId);
  }
  ngAfterViewInit() {
    if (!this._isBrowser) {
      return;
    }
    if (!window.YT || !window.YT.Player) {
      if (this.showBeforeIframeApiLoads && (typeof ngDevMode === "undefined" || ngDevMode)) {
        throw new Error("Namespace YT not found, cannot construct embedded youtube player. Please install the YouTube Player API Reference for iframe Embeds: https://developers.google.com/youtube/iframe_api_reference");
      }
      this._existingApiReadyCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        this._existingApiReadyCallback?.();
        this._ngZone.run(() => this._createPlayer());
      };
    } else {
      this._createPlayer();
    }
  }
  ngOnChanges(changes) {
    if (this._shouldRecreatePlayer(changes)) {
      this._createPlayer();
    } else if (this._player) {
      if (changes["width"] || changes["height"]) {
        this._setSize();
      }
      if (changes["suggestedQuality"]) {
        this._setQuality();
      }
      if (changes["startSeconds"] || changes["endSeconds"] || changes["suggestedQuality"]) {
        this._cuePlayer();
      }
    }
  }
  ngOnDestroy() {
    this._pendingPlayer?.destroy();
    if (this._player) {
      this._player.destroy();
      window.onYouTubeIframeAPIReady = this._existingApiReadyCallback;
    }
    this._playerChanges.complete();
    this._destroyed.next();
    this._destroyed.complete();
  }
  /** See https://developers.google.com/youtube/iframe_api_reference#playVideo */
  playVideo() {
    if (this._player) {
      this._player.playVideo();
    } else {
      this._getPendingState().playbackState = YT.PlayerState.PLAYING;
    }
  }
  /** See https://developers.google.com/youtube/iframe_api_reference#pauseVideo */
  pauseVideo() {
    if (this._player) {
      this._player.pauseVideo();
    } else {
      this._getPendingState().playbackState = YT.PlayerState.PAUSED;
    }
  }
  /** See https://developers.google.com/youtube/iframe_api_reference#stopVideo */
  stopVideo() {
    if (this._player) {
      this._player.stopVideo();
    } else {
      this._getPendingState().playbackState = YT.PlayerState.CUED;
    }
  }
  /** See https://developers.google.com/youtube/iframe_api_reference#seekTo */
  seekTo(seconds, allowSeekAhead) {
    if (this._player) {
      this._player.seekTo(seconds, allowSeekAhead);
    } else {
      this._getPendingState().seek = {
        seconds,
        allowSeekAhead
      };
    }
  }
  /** See https://developers.google.com/youtube/iframe_api_reference#mute */
  mute() {
    if (this._player) {
      this._player.mute();
    } else {
      this._getPendingState().muted = true;
    }
  }
  /** See https://developers.google.com/youtube/iframe_api_reference#unMute */
  unMute() {
    if (this._player) {
      this._player.unMute();
    } else {
      this._getPendingState().muted = false;
    }
  }
  /** See https://developers.google.com/youtube/iframe_api_reference#isMuted */
  isMuted() {
    if (this._player) {
      return this._player.isMuted();
    }
    if (this._pendingPlayerState) {
      return !!this._pendingPlayerState.muted;
    }
    return false;
  }
  /** See https://developers.google.com/youtube/iframe_api_reference#setVolume */
  setVolume(volume) {
    if (this._player) {
      this._player.setVolume(volume);
    } else {
      this._getPendingState().volume = volume;
    }
  }
  /** See https://developers.google.com/youtube/iframe_api_reference#getVolume */
  getVolume() {
    if (this._player) {
      return this._player.getVolume();
    }
    if (this._pendingPlayerState && this._pendingPlayerState.volume != null) {
      return this._pendingPlayerState.volume;
    }
    return 0;
  }
  /** See https://developers.google.com/youtube/iframe_api_reference#setPlaybackRate */
  setPlaybackRate(playbackRate) {
    if (this._player) {
      return this._player.setPlaybackRate(playbackRate);
    } else {
      this._getPendingState().playbackRate = playbackRate;
    }
  }
  /** See https://developers.google.com/youtube/iframe_api_reference#getPlaybackRate */
  getPlaybackRate() {
    if (this._player) {
      return this._player.getPlaybackRate();
    }
    if (this._pendingPlayerState && this._pendingPlayerState.playbackRate != null) {
      return this._pendingPlayerState.playbackRate;
    }
    return 0;
  }
  /** See https://developers.google.com/youtube/iframe_api_reference#getAvailablePlaybackRates */
  getAvailablePlaybackRates() {
    return this._player ? this._player.getAvailablePlaybackRates() : [];
  }
  /** See https://developers.google.com/youtube/iframe_api_reference#getVideoLoadedFraction */
  getVideoLoadedFraction() {
    return this._player ? this._player.getVideoLoadedFraction() : 0;
  }
  /** See https://developers.google.com/youtube/iframe_api_reference#getPlayerState */
  getPlayerState() {
    if (!this._isBrowser || !window.YT) {
      return void 0;
    }
    if (this._player) {
      return this._player.getPlayerState();
    }
    if (this._pendingPlayerState && this._pendingPlayerState.playbackState != null) {
      return this._pendingPlayerState.playbackState;
    }
    return YT.PlayerState.UNSTARTED;
  }
  /** See https://developers.google.com/youtube/iframe_api_reference#getCurrentTime */
  getCurrentTime() {
    if (this._player) {
      return this._player.getCurrentTime();
    }
    if (this._pendingPlayerState && this._pendingPlayerState.seek) {
      return this._pendingPlayerState.seek.seconds;
    }
    return 0;
  }
  /** See https://developers.google.com/youtube/iframe_api_reference#getPlaybackQuality */
  getPlaybackQuality() {
    return this._player ? this._player.getPlaybackQuality() : "default";
  }
  /** See https://developers.google.com/youtube/iframe_api_reference#getAvailableQualityLevels */
  getAvailableQualityLevels() {
    return this._player ? this._player.getAvailableQualityLevels() : [];
  }
  /** See https://developers.google.com/youtube/iframe_api_reference#getDuration */
  getDuration() {
    return this._player ? this._player.getDuration() : 0;
  }
  /** See https://developers.google.com/youtube/iframe_api_reference#getVideoUrl */
  getVideoUrl() {
    return this._player ? this._player.getVideoUrl() : "";
  }
  /** See https://developers.google.com/youtube/iframe_api_reference#getVideoEmbedCode */
  getVideoEmbedCode() {
    return this._player ? this._player.getVideoEmbedCode() : "";
  }
  /** Gets an object that should be used to store the temporary API state. */
  _getPendingState() {
    if (!this._pendingPlayerState) {
      this._pendingPlayerState = {};
    }
    return this._pendingPlayerState;
  }
  /**
   * Determines whether a change in the component state
   * requires the YouTube player to be recreated.
   */
  _shouldRecreatePlayer(changes) {
    const change = changes["videoId"] || changes["playerVars"] || changes["disableCookies"];
    return !!change && !change.isFirstChange();
  }
  /** Creates a new YouTube player and destroys the existing one. */
  _createPlayer() {
    this._player?.destroy();
    this._pendingPlayer?.destroy();
    if (typeof YT === "undefined" || !this.videoId && !this.playerVars?.list) {
      return;
    }
    const player = this._ngZone.runOutsideAngular(() => new YT.Player(this.youtubeContainer.nativeElement, {
      videoId: this.videoId,
      host: this.disableCookies ? "https://www.youtube-nocookie.com" : void 0,
      width: this.width,
      height: this.height,
      playerVars: this.playerVars
    }));
    const whenReady = () => {
      this._player = player;
      this._pendingPlayer = void 0;
      player.removeEventListener("onReady", whenReady);
      this._playerChanges.next(player);
      this._setSize();
      this._setQuality();
      if (this._pendingPlayerState) {
        this._applyPendingPlayerState(player, this._pendingPlayerState);
        this._pendingPlayerState = void 0;
      }
      const state = player.getPlayerState();
      if (state === YT.PlayerState.UNSTARTED || state === YT.PlayerState.CUED || state == null) {
        this._cuePlayer();
      }
    };
    this._pendingPlayer = player;
    player.addEventListener("onReady", whenReady);
  }
  /** Applies any state that changed before the player was initialized. */
  _applyPendingPlayerState(player, pendingState) {
    const {
      playbackState,
      playbackRate,
      volume,
      muted,
      seek
    } = pendingState;
    switch (playbackState) {
      case YT.PlayerState.PLAYING:
        player.playVideo();
        break;
      case YT.PlayerState.PAUSED:
        player.pauseVideo();
        break;
      case YT.PlayerState.CUED:
        player.stopVideo();
        break;
    }
    if (playbackRate != null) {
      player.setPlaybackRate(playbackRate);
    }
    if (volume != null) {
      player.setVolume(volume);
    }
    if (muted != null) {
      muted ? player.mute() : player.unMute();
    }
    if (seek != null) {
      player.seekTo(seek.seconds, seek.allowSeekAhead);
    }
  }
  /** Cues the player based on the current component state. */
  _cuePlayer() {
    if (this._player && this.videoId) {
      this._player.cueVideoById({
        videoId: this.videoId,
        startSeconds: this.startSeconds,
        endSeconds: this.endSeconds,
        suggestedQuality: this.suggestedQuality
      });
    }
  }
  /** Sets the player's size based on the current input values. */
  _setSize() {
    this._player?.setSize(this.width, this.height);
  }
  /** Sets the player's quality based on the current input values. */
  _setQuality() {
    if (this._player && this.suggestedQuality) {
      this._player.setPlaybackQuality(this.suggestedQuality);
    }
  }
  /** Gets an observable that adds an event listener to the player when a user subscribes to it. */
  _getLazyEmitter(name) {
    return this._playerChanges.pipe(
      // Switch to the bound event. `switchMap` ensures that the old event is removed when the
      // player is changed. If there's no player, return an observable that never emits.
      switchMap((player) => {
        return player ? fromEventPattern((listener) => {
          player.addEventListener(name, listener);
        }, (listener) => {
          try {
            player?.removeEventListener?.(name, listener);
          } catch {
          }
        }) : of();
      }),
      // By default we run all the API interactions outside the zone
      // so we have to bring the events back in manually when they emit.
      (source) => new Observable((observer) => source.subscribe({
        next: (value) => this._ngZone.run(() => observer.next(value)),
        error: (error) => observer.error(error),
        complete: () => observer.complete()
      })),
      // Ensures that everything is cleared out on destroy.
      takeUntil(this._destroyed)
    );
  }
};
_YouTubePlayer.ɵfac = function YouTubePlayer_Factory(t) {
  return new (t || _YouTubePlayer)(ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(PLATFORM_ID));
};
_YouTubePlayer.ɵcmp = ɵɵdefineComponent({
  type: _YouTubePlayer,
  selectors: [["youtube-player"]],
  viewQuery: function YouTubePlayer_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c0, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.youtubeContainer = _t.first);
    }
  },
  inputs: {
    videoId: "videoId",
    height: "height",
    width: "width",
    startSeconds: "startSeconds",
    endSeconds: "endSeconds",
    suggestedQuality: "suggestedQuality",
    playerVars: "playerVars",
    disableCookies: "disableCookies",
    showBeforeIframeApiLoads: "showBeforeIframeApiLoads"
  },
  outputs: {
    ready: "ready",
    stateChange: "stateChange",
    error: "error",
    apiChange: "apiChange",
    playbackQualityChange: "playbackQualityChange",
    playbackRateChange: "playbackRateChange"
  },
  features: [ɵɵNgOnChangesFeature],
  decls: 2,
  vars: 0,
  consts: [["youtubeContainer", ""]],
  template: function YouTubePlayer_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelement(0, "div", null, 0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
var YouTubePlayer = _YouTubePlayer;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YouTubePlayer, [{
    type: Component,
    args: [{
      selector: "youtube-player",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      // This div is *replaced* by the YouTube player embed.
      template: "<div #youtubeContainer></div>"
    }]
  }], () => [{
    type: NgZone
  }, {
    type: Object,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }], {
    videoId: [{
      type: Input
    }],
    height: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    startSeconds: [{
      type: Input
    }],
    endSeconds: [{
      type: Input
    }],
    suggestedQuality: [{
      type: Input
    }],
    playerVars: [{
      type: Input
    }],
    disableCookies: [{
      type: Input
    }],
    showBeforeIframeApiLoads: [{
      type: Input
    }],
    ready: [{
      type: Output
    }],
    stateChange: [{
      type: Output
    }],
    error: [{
      type: Output
    }],
    apiChange: [{
      type: Output
    }],
    playbackQualityChange: [{
      type: Output
    }],
    playbackRateChange: [{
      type: Output
    }],
    youtubeContainer: [{
      type: ViewChild,
      args: ["youtubeContainer", {
        static: true
      }]
    }]
  });
})();
var COMPONENTS = [YouTubePlayer];
var _YouTubePlayerModule = class _YouTubePlayerModule {
};
_YouTubePlayerModule.ɵfac = function YouTubePlayerModule_Factory(t) {
  return new (t || _YouTubePlayerModule)();
};
_YouTubePlayerModule.ɵmod = ɵɵdefineNgModule({
  type: _YouTubePlayerModule,
  declarations: [YouTubePlayer],
  exports: [YouTubePlayer]
});
_YouTubePlayerModule.ɵinj = ɵɵdefineInjector({});
var YouTubePlayerModule = _YouTubePlayerModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YouTubePlayerModule, [{
    type: NgModule,
    args: [{
      declarations: COMPONENTS,
      exports: COMPONENTS
    }]
  }], null, null);
})();
export {
  YouTubePlayer,
  YouTubePlayerModule
};
//# sourceMappingURL=@angular_youtube-player.js.map
