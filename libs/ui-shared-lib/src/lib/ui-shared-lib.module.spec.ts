import { async, TestBed } from '@angular/core/testing';
import { UiSharedLibModule } from './ui-shared-lib.module';

describe('UiSharedLibModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiSharedLibModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(UiSharedLibModule).toBeDefined();
  });
});
