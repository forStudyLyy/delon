import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { REP_TYPE } from '@delon/theme';
import { AlainConfigService, AlainSEConfig, InputBoolean, InputNumber, toNumber } from '@delon/util';

@Component({
  selector: 'se-container, [se-container]',
  exportAs: 'seContainer',
  templateUrl: './se-container.component.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SEContainerComponent {
  // #region fields

  @Input('se-container') @InputNumber(null) colInCon: REP_TYPE;
  @Input() @InputNumber(null) col: REP_TYPE;
  @Input() @InputNumber(null) labelWidth: number;
  @Input() title: string | TemplateRef<void>;

  @Input()
  get gutter(): number {
    return this.nzLayout === 'horizontal' ? this._gutter : 0;
  }
  set gutter(value: number) {
    this._gutter = toNumber(value);
  }
  private _gutter: number;

  @Input()
  get nzLayout() {
    return this._nzLayout;
  }
  set nzLayout(value: string) {
    this._nzLayout = value;
    if (value === 'inline') {
      this.size = 'compact';
    }
  }
  private _nzLayout: string;

  @Input() size: 'default' | 'compact';
  @Input() @InputBoolean() firstVisual: boolean;
  @Input() @InputBoolean() line = false;

  // #endregion

  constructor(configSrv: AlainConfigService) {
    configSrv.attach<AlainSEConfig, 'se'>(this, 'se', {
      size: 'default',
      nzLayout: 'horizontal',
      gutter: 32,
      col: 2,
      labelWidth: 150,
      firstVisual: false,
    });
  }
}
