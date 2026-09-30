import { Fragment } from 'react'
import { useT } from '../i18n'
import { Rich, splitComparison } from '../rich'

export function ComparisonText({ text }: { text: string }) {
  const t = useT()
  return (
    <span className="comparison-text">
      {splitComparison(text).map((part, index) => (
        <Fragment key={index}>
          {index > 0 && <>
            <span className="comparison-divider" aria-hidden />
            <span className="comparison-join">{t({ zh: ' 与 ', en: ' and ' })}</span>
          </>}
          <Rich text={part} />
        </Fragment>
      ))}
    </span>
  )
}
