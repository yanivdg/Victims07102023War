import { TestBed } from '@angular/core/testing';
import { AppYoutubePlayerModule } from './app-youtube-player.module';

describe('AppYoutubePlayerModule', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AppYoutubePlayerModule],
        });
    });

    it('initializes', () => {
        const module = TestBed.inject(AppYoutubePlayerModule);
        expect(module).toBeTruthy();
    });
});
